"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction =(obj) =>{
    const serialized ={...obj};

    if(obj.balance){
        serialized.balance = obj.balance.toNumber();
    }
};
export async function createAccount(data){
    try{
        const{userId} = await auth();
        if(!userId) throw new Error("Unauthorized");
        const user = await db.user.findUnique({
            where:{clerkUserId:userId},
        });
        if(!user){
            throw new Error("User not found");
        }
        const balanceFloat = parseFloat(data.balance)
        if(isNaN(balanceFloat)){
            throw new Error("Invalid amount");
        }

        const existingAccount = await db.account.findMany({
            where :{userId:user.id},
        });

        const shouldbeDefault = existingAccounts.length==0?true:data.isDefault;

        if(shouldbeDefault){
            await db.account.updateMany({
                where:{userd: user.id,isDefault:true},
                // will find the default account make remove
                // it from default
                data:{isDefault:false},
            });
        }

        const account = await db.account({
            data:{
                ...data,
                balance: balanceFloat,
                userId:user.id,
                isDefault:shouldbeDefault,
            },
        });

        // next js doesnt support the decimal value 
        // so we have to serilize it and conert back to
        // number

        const serializedAccount = serializedTranaction(account);

        revalidatePath("/dashboard")
        return{success :true,data:serializedAccount};
    } catch(error){
        throw new Error(error.message);
    }
}