import prisma from "@bizflow/db";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth<BetterAuthOptions>({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [process.env.CORS_ORIGIN || ""],
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            // Always ask user to select account for better UX
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // Request necessary scopes
            scope: ["email", "profile"],
        },
    },
    // Enable account linking so users can link both email/password and Google
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google"],
        },
    },
    advanced: {
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        },
    },
});