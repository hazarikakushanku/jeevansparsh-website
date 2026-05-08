"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Activity, HeartPulse, BrainCircuit, Users } from "lucide-react";
import HeroParticles from "@/components/HeroParticles";
import HeroSlider from "@/components/HeroSlider";
import NoticeBanner from "@/components/NoticeBanner";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const doctorRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-content > *", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      // Services Animation
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // Doctor Intro Animation
      gsap.from(".doctor-intro", {
        scrollTrigger: {
          trigger: doctorRef.current,
          start: "top 75%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".doctor-image", {
        scrollTrigger: {
          trigger: doctorRef.current,
          start: "top 75%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      <NoticeBanner />
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-jeevansparsh-blue text-white overflow-hidden py-24 sm:py-32 px-4 sm:px-6 lg:px-12 min-h-screen lg:h-screen lg:max-h-[900px] flex items-center">
        {/* Deep blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-jeevansparsh-blue via-jeevansparsh-blue/95 to-blue-900 z-0 pointer-events-none"></div>

        {/* Particles on top of the gradient */}
        <div className="absolute inset-0 z-[1]">
          <HeroParticles />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto relative z-[10] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          <div className="hero-content space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-jeevansparsh-yellow font-medium text-sm">
              Welcome to Jeevansparsh
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Reclaim<br /><span className="text-jeevansparsh-yellow">Your Motion</span>, Reclaim Your Life.
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-lg">
              A premium Multi-Speciality Physiotherapy and Rehabilitation Centre dedicated to your well-being.
            </p>
            <div className="pt-4 flex flex-wrap gap-3 sm:gap-4">
              <Link href="/contact" className="px-6 sm:px-8 py-3 bg-jeevansparsh-yellow text-jeevansparsh-blue font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 text-sm sm:text-base">
                Book Appointment <ArrowRight size={18} />
              </Link>
              <Link href="/facilities" className="px-6 sm:px-8 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm sm:text-base">
                Explore Facilities
              </Link>
            </div>
          </div>
          <div className="flex hero-content relative justify-center lg:justify-end items-center mt-8 lg:mt-0 w-full">
            <div className="w-full max-w-[280px] sm:max-w-sm relative">
              <div className="absolute -inset-4 bg-jeevansparsh-yellow/20 blur-3xl rounded-full"></div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                <HeroSlider />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section ref={servicesRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-jeevansparsh-blue mb-4">Our Specialities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive care tailored to your unique needs using state-of-the-art techniques and equipment.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Activity, title: "Orthopedic Rehab", desc: "Recovery from joint pain, arthritis, and post-surgical rehab." },
              { icon: BrainCircuit, title: "Neuro Physiotherapy", desc: "Specialized care for stroke, Parkinson's, and nerve injuries." },
              { icon: Users, title: "Geriatric Care", desc: "Improving mobility and independence for the elderly." }
            ].map((service, i) => (
              <div key={i} className="service-card bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-blue-50 text-jeevansparsh-blue rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-jeevansparsh-blue mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <Link href="/we-care" className="text-jeevansparsh-blue font-semibold flex items-center gap-2 hover:text-blue-700">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Intro Section */}
      <section ref={doctorRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="doctor-image relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
              {/* Placeholder for Doctor Image */}
              <div className="w-full h-full relative">
                <img src="/doctor.png" alt="Dr. Naba Pallab Bhuyan" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div className="doctor-intro space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold text-jeevansparsh-blue mb-4">Meet Our Expert</h2>
            <h3 className="text-2xl font-semibold text-jeevansparsh-yellow mb-2">Dr. Jeevansparsh</h3>
            <p className="text-base font-medium text-gray-500 mb-3">Chief Physiotherapist</p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Dr. Jeevansparsh is a highly respected physiotherapist with extensive experience in treating complex musculoskeletal and neurological conditions. His approach combines evidence-based practices with deep compassion for his patients, ensuring that each individual receives a personalized path to recovery.
            </p>

            <div>
              <h4 className="text-base font-bold text-gray-800 mb-2">Qualifications</h4>
              <ul className="space-y-1 text-gray-600 list-disc list-inside">
                <li>Master of Physiotherapy</li>
                <li>Bachelor of Physiotherapy</li>
              </ul>
            </div>

            <div className="pt-4">
              <Link href="/doctors" className="px-8 py-3 border-2 border-jeevansparsh-blue text-jeevansparsh-blue font-bold rounded-lg hover:bg-jeevansparsh-blue hover:text-white transition-colors">
                View Full Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-jeevansparsh-blue text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">Ready to start your recovery journey?</h2>
          <p className="text-blue-100 text-lg">Contact us today to schedule your consultation and take the first step towards a pain-free life.</p>
          <Link href="/contact" className="inline-block px-10 py-4 bg-jeevansparsh-yellow text-jeevansparsh-blue font-bold rounded-lg hover:bg-yellow-400 transition-colors text-lg shadow-lg shadow-yellow-500/20">
            Book an Appointment Now
          </Link>
        </div>
      </section>
    </div>
  );
}
