"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { Job } from "@/type";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { job_service } from "@/lib/constants";
import Cookies from "js-cookie";
import { Briefcase, Building2, CheckCircle, Eye, MapPin, Users, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "@/components/loading";

const MyJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    async function fetchMyJobs() {
      try {
        const { data } = await axios.get(`${job_service}/api/job/myjobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMyJobs();
  }, [token]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Card className="shadow-lg border-2 overflow-hidden">
        <div className="bg-blue-600 text-white p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Briefcase size={20} className="text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">My Job Postings</CardTitle>
                <p className="text-sm opacity-80">{jobs.length} total jobs posted</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.job_id}
                  className="p-5 rounded-lg border-2 hover:border-blue-500 transition-all bg-background"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <span
                          className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${
                            job.is_active
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600"
                          }`}
                        >
                          {job.is_active ? <CheckCircle size={14} /> : <XCircle size={14} />}
                          {job.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-70">
                        <div className="flex items-center gap-1.5">
                          <Building2 size={16} />
                          <span>{job.company_name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={16} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users size={16} />
                          <span>{job.openings} openings</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/jobs/${job.job_id}`}>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye size={16} /> View Applications
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <Briefcase size={32} className="opacity-40" />
              </div>
              <p className="text-base opacity-70 mb-4">You haven't posted any jobs yet.</p>
              <Link href="/account">
                <Button variant="outline">Go to Companies to Post a Job</Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MyJobs;
