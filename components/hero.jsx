"use client"
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    
    return (
        <div className="pb-20 px-4">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl pb-6 font-bold bg-gradient-to-r from-blue-900 via-yellow-500 to-blue-800 bg-clip-text text-transparent leading-tight tracking-tight">
                    Manage Your Finances<br/>
                    with Intelligence
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                    An AI-powered financial management platform that helps you track,
                    analyze, and optimize your spending with real-time insights.
                </p>
                <div className="flex gap-4 justify-center mb-12">
                    <Link href="/dashboard">
                        <Button size="lg" className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 rounded-full text-lg shadow-lg">
                            Get Started
                        </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="px-8 py-3 border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 rounded-full text-lg">
                        Watch Demo
                    </Button>
                </div>
                <div className="hero-image-wrapper relative">
                    <div ref={imageRef} className="hero-image">
                        <Image 
                            src="/banner.jpeg"
                            width={1280} 
                            height={720}
                            alt="Dashboard Preview"
                            className="rounded-2xl shadow-2xl border mx-auto"
                            priority
                        />
                        {/* Optional: Add a subtle overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
