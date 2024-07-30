"use client"
import { Button } from '@/components/ui/button';
import React, { useState, useEffect ,useContext} from 'react';
import axio from 'axios'
import { Loader2Icon } from 'lucide-react';
import { UserSubscription } from '@/utils/schema';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
const PlanCard = ({ title, price, features }) => (
  <div className="bg-white rounded-lg shadow-md p-6 m-4">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-2xl font-bold mb-4">${price}/month</p>
    <ul className="mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2">
          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

function Billing() {
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const {userSubscription,setuserSubscription}=useContext(UserSubscriptionContext)

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const {user}=useUser();
  const CreateSubscription = () => {
    setLoading(true);
    axio.post('/api/create-subscription', {})
      .then(resp => {
        console.log(resp.data);
        OnPayment(resp.data.id);
      }, (error) => {
        setLoading(false);
      });
  };

  const OnPayment = (subId: string) => {
    if (typeof window === 'undefined' || !razorpayLoaded) {
      console.error('Razorpay not loaded');
      setLoading(false);
      return;
    }

    const options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription_id": subId,
      "name": 'NextGenAI',
      "description": 'Monthly Subscription',
      "handler": async (resp: any) => {
        console.log(resp);
        if(resp)
          {
          SaveSubscription(resp?.razorpay_payment_id)
         }
        setLoading(false);
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const SaveSubscription=async(paymentId:string)=>{
    const result=await db.insert(UserSubscription)
    .values({
      email:user?.primaryEmailAddress?.emailAddress,
      userName:user?.fullName,
      active:true,
      paymentId:paymentId,
      joinDate:moment().format('DD/MM/yyyy')
    });
    console.log(result);
    if(result)
      {
        window.location.reload();
      }
  }

  const plans = [
    {
      title: "Free Plan",
      price: 0,
      features: [
        "10,000 Words/Month",
        "50+ Content Templates",
        "Unlimited Download & Copy",
        "1 Month of History"
      ]
    },
    {
      title: "Monthly Plan",
      price: 3.57,
      features: [
        "100,000 Words/Month",
        "50+ Template Access",
        "Unlimited Download & Copy",
        "1 Year of History"
      ]
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <h2 className='text-center font-bold text-3xl mb-8'>Upgrade With Monthly Plan</h2>
        <div className="flex flex-wrap justify-center">
          {plans.map((plan, index) => (
            <div key={index}>
              <PlanCard {...plan} />
              {plan.title === "Monthly Plan" && (
                <button
                  disabled={loading}
                  onClick={() => CreateSubscription()}
                  className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mt-4 flex items-center justify-center"
                >
                  {loading && <Loader2Icon className='animate-spin mr-2' />}
                  {userSubscription?'Active Plan': 'Get Started'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Billing;