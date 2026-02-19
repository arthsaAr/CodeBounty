/**
 * creating bounty setup
 */

import { Router } from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import { PrismaClient } from "@prisma/client";

router.post("/", authenticate, async (req: AuthenticatedRequest, res)=> {
    try{
        const user = req.user;
        const { repositoryId, title, description, amount, difficulty} = req.body;

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

//TODO!
//need to get all the active repositories(for the bug finders)
//update the status of the bounties, active, completed, cancelled

export default router;