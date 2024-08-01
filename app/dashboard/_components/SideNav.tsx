"use client"
import React, { useEffect,useState } from 'react'
import Image from 'next/image'
import { Home, FileClock, Settings, WalletCards, Shield, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import UsageTrack from './UsageTrack'
import Link from 'next/link'


function SideNav() {
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

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

    const togglePrivacyPolicy = () => {
        setShowPrivacyPolicy(!showPrivacyPolicy);
    };

    return (
        <div className='h-screen flex flex-col p-5 shadow-sm border bg-white'>
        <div className='flex justify-center mt-[-30px] mb-4'>
            <Image src={'/Next_Gen_AI.png'} alt='logo' width={200} height={200} />
        </div>
        <hr className='my-2 border' />
        <div className='mt-3 flex-grow'>
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
        <div className='mt-auto'>
            <UsageTrack />
            <div className='flex justify-center mt-4'>
                <button
                    onClick={togglePrivacyPolicy}
                    className='flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors'
                >
                    <Shield className='h-4 w-4' />
                    Privacy Policy
                </button>
            </div>
        </div>
        {showPrivacyPolicy && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
                <div className="bg-white text-black p-8 rounded-lg max-w-2xl relative my-8">
                    <button onClick={togglePrivacyPolicy} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold mb-4">Privacy Policy for Next Gen AI</h2>
                    <p className="text-sm text-gray-600 mb-4">Effective Date: 01/08/2024</p>
                    <div className="space-y-4 text-sm">
              <section>
                <h3 className="font-semibold">1. Information We Collect</h3>
                <p>We collect your email address for user identification. Payment information is processed by Razorpay we don't store this data.</p>
              </section>
              <section>
                <h3 className="font-semibold">2. Use of Information</h3>
                <p>Your email is used to identify users and for communication regarding the AI module.</p>
                <p> To communicate with you regarding your use of the AI module and to provide customer support.</p>
              </section>
              <section>
                <h3 className="font-semibold">3. Data Protection</h3>
                <p>We implement security measures to protect your data but can't guarantee absolute security. We don't sell your information.</p>
              </section>
              <section>
                <h3 className="font-semibold">4. Your Rights</h3>
                <p>You may request access, correction, or deletion of your personal information.</p>
              </section>
              <section>
                <h3 className="font-semibold">5. Updates to Policy</h3>
                <p>We may update this policy. Significant changes will be notified on our website.</p>
              </section>
              <section>
                <h3 className="font-semibold">6. Contact Us</h3>
                <p>Next Gen AI <br/>
                  sk4025603@gmail.com</p>
              </section>
              <section>
                <p>By using our AI module, you consent to this Privacy Policy.</p>
                <p>Last updated: 01/08/2024</p>
              </section>
            </div>
          </div>
        </div>
      )}
        </div>
    )
}

export default SideNav

