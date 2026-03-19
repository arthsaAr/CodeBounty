//creating auth routes
import { Router, Request, Response } from "express";
import passport from "../config/passport";
import jwt from "jsonwebtoken";

const router = Router();

//this redirects user to github login page
//and sends the Client_id to github
router.get(
    "/github", passport.authenticate("github", {scope: ["user:email"]})
);

//when the user loggsin and allows the persmission, user is redirected to this callback
//this creates a signed token with id and username
//JST is like proof of identity for future request
router.get(
    "/github/callback", 
    passport.authenticate("github", {session:false}), 
    (req: Request, res: Response) => {

        const user = req.user as any;
        if (!user) {
        return res.status(401).send("User not found");
        }

        const token = jwt.sign({
            id: user.id, username: user.username
        }, process.env.JWT_SECRET!,
        {expiresIn: "7d"});
        console.log("Redirecting with token");
        // res.json({token});      //sending the token to client(or frontend)
        res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
    }
);

export default router;