"use client";
import CarrerGuide from "@/components/carrer-guide";
import Hero from "@/components/hero";
import Loading from "@/components/loading";
import ResumeAnalyzer from "@/components/resume-analyser";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/context/AppContext";
import { Building2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Home = () => {
  const { user, loading } = useAppData();
  if (loading) return <Loading />;
  return (
    <div>
      <Hero />
      {user?.role === "recruiter" ? (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Recruiter Dashboard</h2>
          <p className="text-lg opacity-70 mb-8">
            Manage your companies, post new jobs, and find the best talent.
          </p>
          <Link href="/account">
            <Button size="lg" className="gap-2">
              <Building2 size={18} /> Manage My Companies
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <CarrerGuide />
          <ResumeAnalyzer />
        </>
      )}
    </div>
  );
};

export default Home;
