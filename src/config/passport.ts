import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            callbackURL: "http://localhost:3000/auth/github/callback",
        },
        async(accessToken, refreshToken, profile, done) => {
            try {
                let user = await prisma.user.findUnique({
                    where: {githubId: profile.id},
                });
                if(!user){
                    user = await prisma.user.create({
                        data: {
                            githubId: profile.id,
                            username: profile.username || "",
                            email: profile.emails?.[0]?.value,
                        },
                    });
                }
                return done(null, user);
            } catch(error) {
                return done(error as Error);
            }
        }
    )
);

export default passport;