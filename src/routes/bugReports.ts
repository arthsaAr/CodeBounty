import { Router } from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

//firstly submitting a bug report
router.post("/", authenticate, async (req: AuthenticatedRequest, res) => {
    try{
        const user = req.user;
        const {bountyId, title, description, severity, lineNumbers } = req.body;

        if(!bountyId || !title || !description || !severity ){
            return res.status(400).json({ message: "Required fields are missing!"});
        }

        const bounty = await prisma.bounty.findUnique({
            where: {id: bountyId},
        });

        if(!bounty){
            return res.status(404).json({message: "Bounty not found"});
        }

        if(bounty.status !== "active"){
            return res.status(400).json({message: "Bounty is not active"});
        }

        const report = await prisma.bugReport.create({
            data: {
                title, description, severity, lineNumbers, bountyId, hunterId: user.id,
            },
        });

        res.json(report);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Failed to submit bug report"});
    }
});


//getting bug reports for a bounty(from owner POV)

router.get("/bounty/:bountyId", authenticate, async (req: AuthenticatedRequest, res) => {
    try{
        const user = req.user;
        const bountyId = parseInt(req.params.bountyId as string);

        const bounty = await prisma.bounty.findUnique({
            where: {id: bountyId},
        });

        if(!bounty){
            return res.status(404).json({message: "Bounty not found!"});
        }

        if(bounty.creatorId !== user.id){
            return res.status(403).json({message: "Not your bounty"});
        }

        const reports = await prisma.bugReport.findMany({
            where: {bountyId}
        });

        res.json(reports);
    }catch(error){
        res.status(500).json({message: "Failed to fetch the reports"});
    }
});


//approve or reject a report(from OWNER)
router.patch("/:id/status", authenticate, async (req: AuthenticatedRequest, res)=> {
    try {
        const user = req.user;
        const reportId = parseInt(req.params.id as string);
        const {status} = req.body;

        const report = await prisma.bugReport.findUnique({
            where: {id: reportId},
            include: {bounty: true},
        });

        if(!report){
            return res.status(404).json({message: "Report not found"});
        }

        if(report.bounty.creatorId !== user.id){
            return res.status(403).json({message: "Not your bounty"});
        }

        const  updated = await prisma.bugReport.update({
            where: {id: reportId},
            data: {status},
        });

        res.json(updated);
    }catch(error){
        res.status(500).json({message: "Failed to update report status"});
    }
});


export default router;