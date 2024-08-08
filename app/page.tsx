"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FileText, Sliders, DollarSign, HeadphonesIcon, LucideIcon, Code, Github, X, Mail, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

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
    
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);

  const handleGetStarted = () => {
    if (isLoaded) {
      if (isSignedIn) {
        router.push('/dashboard');
      } else {
        router.push('/signin');
      }
    }
  };

  const togglePrivacyPolicy = () => {
    setShowPrivacyPolicy(!showPrivacyPolicy);
  };

  const toggleContactUs = () => {
    setShowContactUs(!showContactUs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 text-white">
      <div className="container mx-auto px-4 relative">
        <div className="absolute top-0 left-4">
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
        <footer className="text-center py-8">
          <div className="flex flex-col items-center justify-center text-sm text-gray-300">
            <div className="flex items-center">
              <Code className="mr-2 w-4 h-4" />
              <span>Developed by Sanjay Kumar</span>
              <Link href="https://github.com/Sanjaykumar2210" target="_blank" rel="noopener noreferrer">
                <Github className="ml-2 w-4 h-4 cursor-pointer hover:text-white transition-colors" />
              </Link>
            </div>
            <button 
              onClick={togglePrivacyPolicy} 
              className="mt-2 text-xs hover:underline focus:outline-none"
            >
              Privacy Policy
            </button>
            <button 
            onClick={toggleContactUs} 
            className="mt-2 text-xs hover:underline focus:outline-none"
          >
            Contact Us
          </button>
          </div>
        </footer>
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
                  222/246 KVB GARDEN RA PURAM CHENNAI-600028 <br/>
                  sk4025603@gmail.com</p>
              </section>
              <section>
                <p>By using our AI module, you consent to this Privacy Policy.</p>
                <p>Last updated: 08/08/2024</p>
              </section>
            </div>
          </div>
        </div>
      )}

{showContactUs && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-lg max-w-md relative">
            <button onClick={toggleContactUs} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <div className="space-y-4">
              <h3 className="font-semibold">Next Gen AI</h3>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:sk4025603@gmail.com" className="text-blue-600 hover:underline">sk4025603@gmail.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a href="tel:+919962143752" className="text-blue-600 hover:underline">+91 9962143752</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}