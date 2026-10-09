import { Router } from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();
const router = Router();

//importing user's public repos
router.get("/import", authenticate, async(req: AuthenticatedRequest, res) => {
    try {
        const user = req.user;

        if(!user || !user.username){
            return res.status(400).json({message: "User not authenticated properly"});
        }


        //github api endpoint
        const githubURL = `https://api.github.com/users/${user.username}/repos`;

        const response = await fetch(githubURL);

        if(!response.ok){
            const errorText = await response.text();
            console.error("Github API error:", errorText);
            return res.status(500).json({message: "Failed to fetch repos from GitHub", details: errorText});
        }

        const repos = await response.json() as any[];

        const improtedRepos = [];

        for(const repo of repos){
            const dbRepo = await prisma.repository.upsert({
                where: {githubId: repo.id.toString()},
                update: {},
                create: {
                    githubId: repo.id.toString(),
                    name: repo.name,
                    url: repo.html_url,
                    ownerId: user.id,
                },
            });
            improtedRepos.push(dbRepo);
        }
        res.json(improtedRepos);
    } catch(error){
        console.error("Import error:", error);
        res.status(500).json({message: "Failed to import repositories", error: error instanceof Error ? error.message : String(error)});
    }
});

//activating a repository
router.patch("/:id/activate", authenticate, async (req: AuthenticatedRequest, res) => {
    try {
        const user = req.user;
        const repoId = parseInt(req.params.id as string);

        const repo = await prisma.repository.findUnique({where : {id: repoId}});
        if(!repo){
            return res.status(404).json({message: "Repository not found"});
        }
        if(repo.ownerId !== user.id){
            return res.status(403).json({message: "Not your repository"});
        }

        const updatedRepo = await prisma.repository.update({
            where: {id: repoId},
            data: {active: true},
        });

        res.json(updatedRepo);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Failed to activate repository"});
    }
});

//activating a repository
router.patch("/:id/deactivate", authenticate, async (req: AuthenticatedRequest, res) => {
    try {
        const user = req.user;
        const repoId = parseInt(req.params.id as string);

        const repo = await prisma.repository.findUnique({where : {id: repoId}});
        if(!repo){
            return res.status(404).json({message: "Repository not found"});
        }
        if(repo.ownerId !== user.id){
            return res.status(403).json({message: "Not your repository"});
        }

        const updatedRepo = await prisma.repository.update({
            where: {id: repoId},
            data: {active: false},
        });

        res.json(updatedRepo);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Failed to deactivate repository"});
    }
});

//making a GET endpoint for sending repos to the frontend
router.get("/", authenticate, async (req: AuthenticatedRequest, res) => {
    try{
        const user = req.user;

        const repos = await prisma.repository.findMany({
            where: {
                ownerId: user.id
            }
        });

        res.json(repos);
    } catch(error){
        console.error("Fetch repos error:", error);
        res.status(500).json({ message: "Failed to fetch repositories", error: error instanceof Error ? error.message : String(error) });
    }
});

//folders and file types to exclude from the dropdown
const IGNORED_DIRS = ["node_modules/", ".git/", "dist/", "build/", ".next/", "coverage/", "vendor/"];
const IGNORED_EXT = /\.(png|jpe?g|gif|svg|ico|webp|pdf|zip|lock|woff2?|ttf|mp4|mp3)$/i;

//getting all the file paths of a repository
router.get("/:id/files", authenticate, async (req: AuthenticatedRequest, res) => {
    try {
        const user = req.user;
        const repoId = parseInt(req.params.id as string);

        const repo = await prisma.repository.findUnique({ where: { id: repoId } });
        if (!repo) {
            return res.status(404).json({ message: "Repository not found" });
        }
        if (repo.ownerId !== user.id) {
            return res.status(403).json({ message: "Not your repository" });
        }

        //url is saved like https://github.com/owner/name, so owner/name comes from it
        //(falls back to username/name if the url is somehow not in that format)
        const match = repo.url.match(/github\.com\/([^/]+)\/([^/]+)/);
        const owner = match ? match[1] : user.username;
        const name = match ? match[2] : repo.name;

        //optional: set GITHUB_TOKEN in .env to avoid the 60 requests/hour limit
        const headers: Record<string, string> = {
            Accept: "application/vnd.github+json",
            "User-Agent": "codebounty",
        };
        if (process.env.GITHUB_TOKEN) {
            headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
        }

        //finding the default branch (main / master / etc.)
        const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${name}`, { headers });
        if (!repoResponse.ok) {
            const errorText = await repoResponse.text();
            console.error("Github API error:", errorText);
            return res.status(repoResponse.status).json({ message: "Could not reach GitHub repository" });
        }
        const repoData = await repoResponse.json() as any;
        const branch = repoData.default_branch;

        //getting the whole file tree in one call
        const treeResponse = await fetch(
            `https://api.github.com/repos/${owner}/${name}/git/trees/${branch}?recursive=1`,
            { headers }
        );
        if (!treeResponse.ok) {
            const errorText = await treeResponse.text();
            console.error("Github API error:", errorText);
            return res.status(treeResponse.status).json({ message: "Could not read repository files" });
        }
        const tree = await treeResponse.json() as any;

        //keeping only real files (blob = file, tree = folder)
        const files: string[] = tree.tree
            .filter((item: any) => item.type === "blob")
            .map((item: any) => item.path as string)
            .filter((p: string) => !IGNORED_DIRS.some((d) => p.startsWith(d) || p.includes(`/${d}`)))
            .filter((p: string) => !IGNORED_EXT.test(p))
            .sort();

        res.json({ files, truncated: !!tree.truncated, branch });
    } catch (error) {
        console.error("Fetch files error:", error);
        res.status(500).json({ message: "Failed to fetch repository files", error: error instanceof Error ? error.message : String(error) });
    }
});


export default router;