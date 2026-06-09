import { Router } from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

//firstly submitting a bug report
router.post("/", authenticate, async (req: AuthenticatedRequest, res) => {
    try{
        const user = req.user;
        const { bountyId, title, description, severity, linestart, lineend } = req.body;

        if (!bountyId || !title || !description || !severity || linestart === undefined || lineend === undefined) {
            return res.status(400).json({ message: "Required fields are missing!" });
        }

        //converting bountyid to number for actual database
        const parsedBountyId = Number(bountyId);

        const bounty = await prisma.bounty.findUnique({
            where: {id: parsedBountyId},
        });

        if(!bounty){
            return res.status(404).json({message: "Bounty not found"});
        }

        if(bounty.status !== "active"){
            return res.status(400).json({message: "Bounty is not active"});
        }

        const report = await prisma.bugReport.create({
            data: {
                title, 
                description, 
                severity,                           // Prisma automatically checks this against your new Enum we just added
                lineStart: Number(linestart),       //making sure these map to database camelCase Ints
                lineEnd: Number(lineend),
                bountyId: parsedBountyId, 
                hunterId: user.id,
            },
        });

        res.json(report);
    }catch(error){
        console.error("From backend: ", error);
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
            where: {bountyId},
            include: {
                hunter: {
                    select: {
                        username: true
                    }
                }
            }
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

        if(!["approved", "rejected"].includes(status)) {
            return res.status(400).json({message: "Invalid status"});
        }

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

        if(status === "rejected"){
            const  updated = await prisma.bugReport.update({
                where: {id: reportId},
                data: {status: "rejected"},
            });
            res.json(updated);
        }

        //for when approved
        const result = await prisma.$transaction(async (tx) => {
            //firstly update the report
            const  updateReport = await prisma.bugReport.update({
                where: {id: reportId},
                data: {status: "approved"},
            });

            //mark complete
            await tx.bounty.update({
                where: {id: report.bountyId},
                data: {status: "completed"},
            });

            //transfer the credits to hunter

            //creator's is reduced!
            await tx.user.update({
                where: {id: report.bounty.creatorId},
                data: {
                    credits: {decrement: report.bounty.creatorId}
                }
            });

            //hunter should be increased
            await tx.user.update({
                where: {id: report.hunterId},
                data: {
                    credits: {increment: report.bounty.creatorId},
                    reputation: {increment: 10},
                },
            });

            return updateReport;
        });

       res.json(result);

    }catch(error){
        res.status(500).json({message: "Failed to update report status"});
    }
});


export default router;