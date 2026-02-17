//creating auth routes
import { Router } from "express";
import passport from "../config/passport";
import jwt from "jsonwebtoken";

const router = Router();

router.get(
    "/github", passport.authenticate("github", {scope: ["user:email"]})
);

router.get("/github/callback", passport.authenticate("github", {session:false}), 
    (req, res) => {
        const user = req.user as any;
        const token = jwt.sign({
            id: user.id, username: user.username
        }, process.env.JWT_SECRET!,
        {expiresIn: "7d"});

        res.json({token});
    }
);

export default router;