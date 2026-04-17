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

export default router;