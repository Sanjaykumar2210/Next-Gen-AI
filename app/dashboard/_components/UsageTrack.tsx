"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq, sql } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react'
import { HISTORY } from '../history/page';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';

function UsageTrack() {
    const {user} = useUser();
    const {totalUsage, setTotalUsage} = useContext(TotalUsageContext)
    const {userSubscription, setuserSubscription} = useContext(UserSubscriptionContext)
    const [maxWords, setMaxWords] = useState(10000)
    const {updateCreditUsage, setUpdateCreditUsage} = useContext(UpdateCreditUsageContext)
    
    useEffect(() => {
        if (user) {
            GetData();
            IsUserSubscribe();
        }
    }, [user]);
 
    useEffect(() => {
        if (user && updateCreditUsage) {
            GetData();
        }
    }, [updateCreditUsage, user]);

    const GetData = async () => {
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        if (!userEmail) return;

        const result: HISTORY[] = await db.select().from(AIOutput)
            .where(eq(AIOutput.createdBy, userEmail));

        GetTotalUsage(result)
    }
      
    const IsUserSubscribe = async () => {
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        if (!userEmail) return;

        const result = await db.select().from(UserSubscription)
            .where(eq(UserSubscription.email, userEmail));

        if (result && result.length > 0) {
            setuserSubscription(true);
            setMaxWords(100000);
        } else {
            setuserSubscription(false);
            setMaxWords(10000);
        }
    }

    const GetTotalUsage = (result: HISTORY[]) => {
        let total: number = 0;
        result.forEach(element => {
            total = total + Number(element.aiResponse?.length || 0)
        });
        setTotalUsage(total);
    }

    return (
        <div className='m-5'>
            <div className='bg-primary text-white p-3 rounded-lg'>
                <h2 className='font-medium'>Credits</h2>
                <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
                    <div className='h-2 bg-white rounded-full'
                    style={{
                        width: `${(totalUsage / maxWords) * 100}%`
                    }}
                    ></div>
                </div>
                <h2 className='text-sm my-2'>{totalUsage}/{maxWords} credit used</h2>
            </div>
        </div>
    )
}

export default UsageTrack
