'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { navItems } from '@/constants'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import ProfilePicUploader from "./ProfilePicUploader"
import { updateAccount } from "@/lib/actions/user.actions"
import { toast } from "@/hooks/use-toast"

interface Props {
  fullName: string,
  avatar: string,
  email: string,
  $id: string
}

const Sidebar = ({fullName, avatar, email, $id} : Props) => {
  const pathname = usePathname()
  const router = useRouter()

  const removeProfilePicture = async () => {
      try {
        await updateAccount({userId: $id, fullName: fullName});

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
  }
  
  return (
    <aside className='sidebar'>
      <Link href="/">
        <Image 
          src="/assets/icons/logo-full-brand.svg"
          alt='logo'
          width={160}
          height={50}
          className='hidden h-auto lg:block'
        />

        <Image
        src="/assets/icons/logo-brand.svg"
        alt='logo'
        width={52}
        height={52}
        className='lg:hidden'
        />
      </Link>

      <nav className='sidebar-nav'>
        <ul className='flex flex-1 flex-col gap-6'>
          {navItems.map(({url, name, icon}) => (
            <Link key={name} href={url} className='lg:w-full'>
              <li className={cn("sidebar-nav-item", pathname === url && 'shad-active')}>
                <Image 
                src={icon}
                alt={name}
                width={24}
                height={24}
                className={cn("nav-icon", pathname === url && "nav-icon-active")}
                />
                <p className='hidden lg:block'>{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image 
        src="/assets/images/files-2.png"
        alt='logo'
        width={506}
        height={418}
        className='w-full'
      />

      <div className='sidebar-user-info'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={null} className="px-0">
              <Image 
                src={avatar}
                alt='Avatar'
                width={44}
                height={44}
                className='sidebar-user-avatar'
              />
            </Button>
          </DialogTrigger>
          <DialogContent className="shad-dialog button"> {/* className="sm:max-w-md flex flex-col items-center justify-between" */}
            <DialogHeader className="items-center">
              <DialogTitle className="text-xl">Profile Picture</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <Image 
                  src={avatar}
                  alt='Avatar'
                  width={100}
                  height={100}
                  className='aspect-square w-20 rounded-full object-cover'
                /> 
                <Button variant={null} onClick={removeProfilePicture} >
                  <Image
                    src="/assets/icons/delete.svg"
                    alt="avatar delete button"
                    width={40}
                    height={40}
                  />
                </Button>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col gap-3 md:flex-row">
              <DialogClose asChild>
                <Button type="button" className="modal-cancel-button">
                  Cancel
                </Button>
              </DialogClose>
              <ProfilePicUploader userId={$id} />
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar