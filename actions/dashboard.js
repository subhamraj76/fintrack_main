"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
    const serialized = { ...obj };
    if (obj.balance) {
        serialized.balance = obj.balance.toNumber();
    }
    if (obj.amount) {
        serialized.amount = obj.amount.toNumber();
    }
    return serialized; // Added missing return statement
};

export async function createAccount(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
        
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
        
        if (!user) {
            throw new Error("User not found");
        }
        
        const balanceFloat = parseFloat(data.balance);
        if (isNaN(balanceFloat)) {
            throw new Error("Invalid amount");
        }
        
        const existingAccounts = await db.account.findMany({
            where: { userId: user.id },
        });
        
        const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;
        
        if (shouldBeDefault) {
            await db.account.updateMany({
                where: { userId: user.id, isDefault: true },
                // will find the default account and remove it from default
                data: { isDefault: false },
            });
        }
        
        const account = await db.account.create({
            data: {
                ...data,
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault,
            },
        });
        
        // Next.js doesn't support the decimal value 
        // so we have to serialize it and convert back to number
        const serializedAccount = serializeTransaction(account);
        
        revalidatePath("/dashboard");
        return { success: true, data: serializedAccount };
    } catch (error) {
        console.error("Error creating account:", error);
        return { 
            success: false, 
            error: error.message || "Failed to create account" 
        };
    }
}

export async function getUserAccounts(){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");
    
    let user = await db.user.findUnique({
        where: {clerkUserId: userId},
    });
    
    // Create user if doesn't exist
    if(!user){
        // Correct way to import and use clerkClient
        const { clerkClient } = require('@clerk/nextjs/server');
        const clerkUser = await clerkClient.users.getUser(userId);
        
        user = await db.user.create({
            data: {
                clerkUserId: userId,
                email: clerkUser.emailAddresses[0]?.emailAddress || "",
                // Add other required fields based on your Prisma schema
            },
        });
    }
    
    const accounts = await db.account.findMany({
        where:{userId: user.id},
        orderBy:{createdAt: "desc"},
        include:{
            _count:{
                select:{
                    transactions:true,
                },
            },
        },
    });
    
    const serializedAccount = accounts.map(serializeTransaction);
    
    
    return serializedAccount;
}