"use server";

import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { Query, ID, Account, Avatars } from "node-appwrite";
import { constructFileUrl, parseStringify } from "../utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { string } from "zod";
import { InputFile } from "node-appwrite/file";

const getUserByEmail = async (email: string) => {
    const {databases} = await createAdminClient()

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("email", email)]
    )

    return result.total > 0 ? result.documents[0] : null
}

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async ({email} : {email : string}) => {
    const { account } = await createAdminClient()

    try {
        const session = await account.createEmailToken(ID.unique(), email);

        return session.userId
    } catch (error) {
        handleError(error, 'Failed to send email OTP')
    }
}

export const createAccount = async ({
    fullName,
    email,
}: {
    fullName: string,
    email: string
}) => {
    const existingUser = await getUserByEmail(email)

    const accountId = await sendEmailOTP({ email })
    if(!accountId) throw new Error("Failed to send and OTP");

    if (!existingUser) {
        const {databases, avatars} = await createAdminClient()

        //Generate avatar URL using Appwrite's avatar service
        const buffer = await avatars.getInitials(fullName, 100, 100, 'fa7275');

        const base64Avatar = Buffer.from(buffer).toString("base64");
        const dataUrl = `data:image/png;base64,${base64Avatar}`;

        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                fullName,
                email,
                avatar: dataUrl,
                accountId
            },
        );
    }

    return parseStringify({accountId})
}

export const updateAccount = async ({
    userId,
    file
}: {
    userId: string
    file: File | undefined
}) => {
    const { databases, storage } = await createAdminClient()

    try {
        // Convert the file to InputFile format
        const inputFile = InputFile.fromBuffer(file, file.name);

        // Upload file to storage
        const bucketFile = await storage.createFile(
            appwriteConfig.bucketId,
            ID.unique(),
            inputFile
        );

        // Create URL using the utility function
        const fileUrl = constructFileUrl(bucketFile.$id);
        console.log(fileUrl)

        // Update user document
        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            userId,
            {
                avatar: fileUrl,
            },
        );

        return parseStringify(updatedUser);
    } catch (error) {
        handleError(error, "Failed to update avatar");
        return null;
    }
}

export const verifySecret = async ({
    accountId, 
    password
}: {
    accountId: string, 
    password: string
}) => {
    try {
        const {account} = await createAdminClient()

        const session = await account.createSession(accountId, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: '/',
            httpOnly: true,
            sameSite: "strict",
            secure: true
        });

        return parseStringify({sessionId: session.$id})
    } catch (error) {
        handleError(error, "Failed to verify OTP");
    }
}

export const getCurrentUser = async () => {
    try {
        const {databases, account} = await createSessionClient()

        const result = await account.get()

        const user = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal("accountId", result.$id)],
        );

        if(user.total <= 0) return null;

        return parseStringify(user.documents[0])
    } catch (error) {
        console.log(error)
    }
}

export const signOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/sign-in");
  }
};

export const signInUser = async ({email}: {email: string}) => {
    
    try {
        const existingUser = await getUserByEmail(email)
        
        if(existingUser){
            await sendEmailOTP({email})
            return parseStringify({accountId: existingUser.accountId});
        }

        return parseStringify({accountId: null, error: "User not found"});
    } catch (error) {
        handleError(error, "Failed to sign in user")
    }

}