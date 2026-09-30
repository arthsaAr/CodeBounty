import { Router } from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();
const router = Router();

//creates the bounty
router.post("/", authenticate, async (req: AuthenticatedRequest, res)=> {
    try{
        const user = req.user;
        const repositoryId = Number(req.body.repositoryId);
        const title = String(req.body.title ?? "").trim();
        const description = String(req.body.description ?? "").trim();
        const amount = Number(req.body.amount);
        const difficulty = String(req.body.difficulty ?? "").trim();
        const filePath = String(req.body.filePath ?? "").trim();

        if (
            !repositoryId ||
            !title ||
            !description ||
            !difficulty ||
            !filePath ||
            Number.isNaN(amount)
        ) {
            return res.status(400).json({ message: "All fields are required and must be valid." });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: "Amount must be greater than 0." });
        }

        const repo = await prisma.repository.findUnique({
            where: { id: repositoryId },
        });

        if(!repo){
            return res.status(404).json({message: "Repository not found"});
        }

        if(repo.ownerId !== user.id){
            return res.status(403).json({message: "Not your repository"});
        }

        if(!repo.active){
            return res.status(400).json({message: "Repository is not active"});
        }

        const bounty = await prisma.bounty.create({
            data: {
                title, description, amount, difficulty, filePath, repositoryId, creatorId: user.id,
            },
            include: {
                repository: true,
                creator: true,
            },
        });

        res.json(bounty);
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Failed to create bounty"});
    }
});

//getting all the active bounties (for bug finders)
router.get("/", async(req , res) => {
    try{
        const bounties = await prisma.bounty.findMany({
            where: {status: "active"},
            include: {
                repository: {
                    include: {
                        owner: true
                    }
                },
                creator: true,
            },
        });
        res.json(bounties);
    }catch(error){
        res.status(500).json({message: "Failed to fetch bounties" });
    }
});

//updating the status of bounties(like active/completed/cancelled)
router.patch("/:id/status", authenticate, async(req: AuthenticatedRequest, res) => {
    try{
        const user = req.user;
        const bountyId = parseInt(req.params.id as string);
        const {status} = req.body;

        const bounty = await prisma.bounty.findUnique({
            where: {id: bountyId}
        });

        if(!bounty){
            return res.status(404).json({message: "Bounty not found!"});
        }

        if(bounty.creatorId !== user.id){
            return res.status(403).json({message: "Not your bounty"});
        }

        const updated = await prisma.bounty.update({
            where: {id: bountyId},
            data: {status}
        });

        res.json(updated);
    }catch(error){
        res.status(500).json({message: "Failed to update the bounty"});
    }
});

router.get("/:id", async (req, res) => {
  const bounty = await prisma.bounty.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      repository: {
        include: {
          owner: true
        }
      },
      creator: true,
    },
  });

  res.json(bounty);
});

//limit so huge files don't freeze the page
const MAX_FILE_SIZE = 200 * 1024; //200 KB

//getting the actual content of the file the bounty is posted on (for the code box in bounty details)
router.get("/:id/content", authenticate, async (req: AuthenticatedRequest, res) => {
    try {
        const bountyId = parseInt(req.params.id as string);

        const bounty = await prisma.bounty.findUnique({
            where: { id: bountyId },
            include: { repository: true },
        });
        if (!bounty) {
            return res.status(404).json({ message: "Bounty not found" });
        }

        //url is saved like https://github.com/owner/name, so owner and name come from it
        const match = bounty.repository.url.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) {
            return res.status(400).json({ message: "Invalid repository url" });
        }
        const owner = match[1];
        const name = match[2];

        //encoding each part of the path (handles spaces etc. but keeps the slashes)
        const encodedPath = bounty.filePath.split("/").map(encodeURIComponent).join("/");

        //this accept header makes github send the raw file instead of base64 json
        const headers: Record<string, string> = {
            Accept: "application/vnd.github.raw+json",
            "User-Agent": "codebounty",
        };
        //optional: set GITHUB_TOKEN in .env to avoid the 60 requests/hour limit
        if (process.env.GITHUB_TOKEN) {
            headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
        }

        const response = await fetch(
            `https://api.github.com/repos/${owner}/${name}/contents/${encodedPath}`,
            { headers }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Github API error:", errorText);
            if (response.status === 404) {
                return res.status(404).json({ message: "File not found in the repository (it may have been moved or deleted)" });
            }
            return res.status(response.status).json({ message: "Could not fetch file from GitHub" });
        }

        const text = await response.text();

        //binary files contain null characters
        if (text.includes("\u0000")) {
            return res.status(415).json({ message: "This file type can't be previewed" });
        }

        const truncated = text.length > MAX_FILE_SIZE;
        const content = truncated ? text.slice(0, MAX_FILE_SIZE) : text;

        res.json({ filePath: bounty.filePath, content, truncated });
    } catch (error) {
        console.error("Fetch file content error:", error);
        res.status(500).json({ message: "Failed to fetch file content", error: error instanceof Error ? error.message : String(error) });
    }
});

export default router;