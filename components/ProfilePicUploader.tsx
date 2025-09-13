"use client"

import React, {useCallback, useState} from 'react'
import { useDropzone } from 'react-dropzone'
import { MAX_FILE_SIZE } from "@/constants";
import { Button } from './ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { updateAccount } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

const ProfilePicUploader = ({userId}: {userId: string}) => {
    const [file, setFile] = useState<File>()
    const { toast } = useToast();
    const router = useRouter()

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const acceptedFile = acceptedFiles[acceptedFiles.length - 1];
        
        if(acceptedFile.size > MAX_FILE_SIZE) {
            return toast({
                description: (
                    <p className="body-2 text-white">
                        <span className="font-semibold">{acceptedFile.name}</span> is too large.
                        Max file size is 50MB.
                    </p>
                ),
                className: "error-toast",
            });
        }

        try {
            setFile(acceptedFile);
            await updateAccount({
                userId, 
                file: acceptedFile // Use acceptedFile instead of file state
            });

            router.refresh();
            
            toast({
                description: "Profile picture updated successfully",
                className: "success-toast",
            });
        } catch (error) {
            toast({
                description: "Failed to update profile picture",
                className: "error-toast",
            });
        }

    }, [userId, toast]) // Add dependencies

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        },
        maxFiles: 1
    })
    
    return (
        <div {...getRootProps()}>
        <input {...getInputProps()} />
            <Button type="button" className="uploader-button w-full">
                <Image
                    src="/assets/icons/upload.svg"
                    alt="upload"
                    width={24}
                    height={24}
                />{" "}
                <p>Change</p>
            </Button>
        </div>
    )
}

export default ProfilePicUploader