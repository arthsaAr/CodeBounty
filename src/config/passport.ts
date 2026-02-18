import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { Profile } from "passport-github2";
import { VerifyCallback } from "passport-oauth2";

dotenv.config();
const prisma = new PrismaClient();

passport.use(
    //here, github sends passport accesstoken and profile
    //profile contains the id, username, and emails(sent by github)
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            callbackURL: "http://localhost:3000/auth/github/callback",
        },
        async(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                //if user already exists in database(prisma db)
                let user = await prisma.user.findUnique({
                    where: {githubId: profile.id},
                });
                //if no user exists than create one
                //github identity and prisma user are connected using githubID
                if(!user){
                    user = await prisma.user.create({
                        data: {
                            githubId: profile.id,
                            username: profile.username || "",
                            email: profile.emails?.[0]?.value,
                        },
                    });
                }
                return done(null, user);        //auth success
            } catch(error) {
                return done(error as Error);
            }
        }
    )
);

export default passport;