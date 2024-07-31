"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Home, FileClock, Settings, WalletCards } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import UsageTrack from './UsageTrack'
import Link from 'next/link'

function SideNav() {
    const MenuList = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard'
        },
        {
            name: 'History',
            icon: FileClock,
            path: '/dashboard/history'
        },
        {
            name: 'Billing',
            icon: WalletCards,
            path: '/dashboard/billing'
        },
        {
            name: 'Settings',
            icon: Settings,
            path: '/dashboard/settings'
        },
    ]
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        console.log(path)
    }, [path])

    return (
        <div className='h-screen relative p-5 shadow-sm border bg-white'>
             <div className='flex justify-center mt-[-30px] mb-4'>
                <Image src={'/Next_Gen_AI.png'} alt='logo' width={200} height={200} />
            </div>
            <hr className='my-2 border' />
            <div className='mt-3'>
                {MenuList.map((menu, index) => (
                    <Link href={menu.path} key={index}>
                        <div className={`flex gap-2 mb-2 p-3
                        hover:bg-primary hover:text-white rounded-lg
                        cursor-pointer items-center
                        ${path === menu.path ? 'bg-primary text-white' : ''}
                        `}>
                            <menu.icon className='h-6 w-6' />
                            <h2 className='text-lg'>{menu.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='absolute bottom-10 left-0 w-full'>
                <UsageTrack />
            </div>
        </div>
    )
}

export default SideNav