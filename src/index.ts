//express here creates the server/thing that listens on port 3000 and handles HTTP requests
//responsinble for routes, endpoitns, REST APIs
import express from "express";
import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client";
import passport from "./config/passport";
import authRoutes from "./routes/auth";
import { Request, Response } from "express";
import { authenticate } from "./middleware/authenticate";
import { AuthenticatedRequest } from "./middleware/authenticate";
import repositoryRoutes from "./routes/repositories";
import bountyRoutes from "./routes/bounties";

dotenv.config();

const prisma = new PrismaClient();
const app = express();      //creating the web server

//all these router parts are called REST APIs endpoints
//it means, that it uses HTTP methods (GET, POST, PATCH, DELETE)
//it also uses URLs to represent resources
//and returns JSON
//when using POSTMAN, it actually send the call REST API using POST/GET URL...

app.use(express.json());        //this helps server to understand JSON data in request
app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/repositories", repositoryRoutes);
app.use("/bounties", bountyRoutes);

//testing the protected route
//first authenticate --> checks token --> if valid route runs and if invalid 401
app.get("/protected", authenticate, (req: AuthenticatedRequest, res) => {
    res.json({
        message: "Access Granted",
        user: req.user,
    });
});

//creates a route so whensomeone visits http://localhost:3000/ they see "CodeBounty..."
app.get("/", (req: Request, res: Response) => {
    res.send("CodeBounty backend is running!");
});

//just shows the users in the database
app.get("/test-db", async(req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

const PORT = process.env.PORT || 3000;

//starting the server on 3000, or whenever port is in .env
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
});