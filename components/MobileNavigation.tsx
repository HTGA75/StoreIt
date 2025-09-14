"use client"

import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Separator } from '@radix-ui/react-separator'
import { navItems } from '@/constants'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import FileUploader from './FileUploader'
import { Button } from './ui/button'
import { signOutUser } from '@/lib/actions/user.actions'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DialogFooter, DialogHeader } from './ui/dialog'
import ProfilePicUploader from './ProfilePicUploader'

interface Props {
  $id: string,
  accountId: string,
  fullName: string,
  avatar: string,
  email: string
}

const MobileNavigation = ({ $id: ownerId, accountId, fullName, avatar, email }: Props) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className='mobile-header'>
      <Image
        src="/assets/icons/logo-full-brand.svg" 
        alt='logo'
        width={120}
        height={52}
        className='h-auto'
      />

      <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Image 
          src="/assets/icons/menu.svg"
          alt='Search'
          width={30}
          height={30}
        />
      </SheetTrigger>
      <SheetContent className='shad-sheet h-screen px-3'>
          <SheetTitle>
            <div className='header-user'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={null} className="px-0">
                    <Image 
                      src={avatar}
                      alt='Avatar'
                      width={44}
                      height={44}
                      className='header-user-avatar'
                    />
                  </Button>
                </DialogTrigger>
                <DialogContent className="shad-dialog button"> {/* className="sm:max-w-md flex flex-col items-center justify-between" */}
                  <DialogHeader className="items-center">
                    <DialogTitle className="text-xl">Profile Picture</DialogTitle>
                    <DialogDescription>
                      <Image 
                        src={avatar}
                        alt='Avatar'
                        width={100}
                        height={100}
                        className='aspect-square w-20 rounded-full object-cover'
                      />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-col gap-3 md:flex-row">
                    <DialogClose asChild>
                      <Button type="button" className="modal-cancel-button">
                        Cancel
                      </Button>
                    </DialogClose>
                    <ProfilePicUploader userId={ownerId} />
                  </DialogFooter>
                </DialogContent>
             </Dialog>
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === url && "shad-active",
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathname === url && "nav-icon-active",
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <Separator className="my-5 bg-light-200/20" />

          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={async () => await signOutUser()}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
      </SheetContent>
    </Sheet>
    </header>
  )
}

export default MobileNavigation