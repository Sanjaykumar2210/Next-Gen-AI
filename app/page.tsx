"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FileText, Sliders, DollarSign, HeadphonesIcon, LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

// Define the interface for FeatureCard props
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="border border-white/20 rounded-lg p-6 text-center bg-white/10 backdrop-blur-sm">
      <Icon className="h-12 w-12 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <Button variant="outline" className="border-white text-blue-700">Learn more</Button>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  const handleGetStarted = () => {
    if (isLoaded) {
      if (isSignedIn) {
        router.push('/dashboard');
      } else {
        router.push('/signin');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 text-white">
      <div className="container mx-auto px-4 relative">
        <div className="absolute top-0 left-4">
          <Image
            src="/Next_Gen_AI.png"
            alt="Next Gen AI Logo"
            width={150}
            height={150}
          />
        </div>
        <header className="text-center py-12">
          <h1 className="text-5xl font-bold mb-4">Next Gen AI</h1>
          <p className="text-xl mb-6">Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.</p>
          <Button className="text-lg bg-white text-blue-700 hover:bg-blue-100" onClick={handleGetStarted}>
            {isLoaded ? (isSignedIn ? 'Go to Dashboard' : 'Get started') : 'Loading...'}
          </Button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          <FeatureCard
            icon={FileText}
            title="25+ templates"
            description="Responsive, and mobile-first project on the web"
          />
          <FeatureCard
            icon={Sliders}
            title="Customizable"
            description="Components are easily customized and extendable"
          />
          <FeatureCard
            icon={DollarSign}
            title="Free to Use"
            description="Every component and plugin is well documented"
          />
          <FeatureCard
            icon={HeadphonesIcon}
            title="24/7 Support"
            description="Contact us 24 hours a day, 7 days a week"
          />
        </section>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 265e8d2767bbc8a427b5822b6a694cf245009846
