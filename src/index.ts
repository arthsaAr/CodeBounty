import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();      //creating the web server
app.use(express.json());        //this helps server to understand JSON data in request

//creates a route so whensomeone visits http://localhost:3000/ they see "CodeBounty..."
app.get("/", (req, res) => {
    res.send("CodeBounty backend is running!");
});

const PORT = process.env.PORT || 3000;

//starting the server on 3000, or whenever port is in .env
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
});