"use client";
import { auth_service } from "@/lib/constants";
import { useAppData } from "@/context/AppContext";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Label } from "@/components/ui/label";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/loading";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const { isAuth, user, setUser, loading, setIsAuth, fetchApplications } =
    useAppData();

  if (loading) return <Loading />;

  if (isAuth) {
    if (user?.role === "recruiter") return redirect("/account");
    return redirect("/");
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const { data } = await axios.post(`${auth_service}/api/auth/login`, {
        email,
        password,
      });

      // ✅ Store token in cookie (ONLY ONCE)
      Cookies.set("token", data.token, {
        expires: 15,
        path: "/",
        sameSite: "lax",
      });

      // ✅ Update state
      setUser(data.userObject);
      setIsAuth(true);
      fetchApplications();

      toast.success(data.message);

    } catch (error: any) {
      console.log(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(message);
      setIsAuth(false);

    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back to HireHeaven
          </h1>
          <p className="text-sm opacity-70">Sign in to continue your journey</p>
        </div>

        <div className="border border-gray-400 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
          <form onSubmit={submitHandler} className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="icon-style" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-11"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="icon-style" />
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 h-11"
                />
              </div>
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <Link href="/forgot" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Button */}
            <Button disabled={btnLoading} className="w-full">
              {btnLoading ? "Signing in..." : "Sign In"}
              <ArrowRight size={18} />
            </Button>

          </form>

          {/* Register */}
          <div className="mt-6 pt-6 border-t border-gray-400">
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-500 font-medium hover:underline">
                Create a new account?
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;