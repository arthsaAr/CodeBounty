import { Router } from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

//creates the bounty
router.post("/", authenticate, async (req: AuthenticatedRequest, res)=> {
    try{
        const user = req.user;
        const { repositoryId, title, description, amount, difficulty } = req.body;

        if(!repositoryId || !title || !description || !amount || !difficulty){
            return res.status(400).json({ message: "All fields required"});
        }

        if(amount <= 0){
            return res.status(400).json({message: "Amount must be greator than 0"});
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
                title, description, amount, difficulty, repositoryId, creatorId: user.id,
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
            include: {repository: true},
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
  });

  res.json(bounty);
});

export default router;