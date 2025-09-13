"use client"

import React, {useCallback, useState} from 'react'
import { useDropzone } from 'react-dropzone'
import { MAX_FILE_SIZE } from "@/constants";
import { Button } from './ui/button';
import Image from 'next/image';
import { getFileType } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ProfilePicUploader = () => {
    const [file, setFile] = useState<File>()
    const { toast } = useToast();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[acceptedFiles.length - 1];
        
        if(file.size > MAX_FILE_SIZE) {
            return toast({
                description: (
                    <p className="body-2 text-white">
                        <span className="font-semibold">{file.name}</span> is too large.
                        Max file size is 50MB.
                    </p>
                ),
                className: "error-toast",
            });
        }

        setFile(file);
    }, [toast])
    
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