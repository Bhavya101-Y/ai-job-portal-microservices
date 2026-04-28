"use client";

import { AppContextType, Application, AppProviderProps, User } from "@/type";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { auth_service, job_service, payment_service, user_service, utils_service } from "@/lib/constants";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

const token = Cookies.get("token") || "";

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${user_service}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      });

      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfilePic(fromData: any) {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/update/pic`,
        fromData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update profile picture");
    } finally {
      setLoading(false);
    }
  }

  async function updateResume(fromData: any) {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/update/resume`,
        fromData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update resume");
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(name: string, phoneNumber: string, bio: string) {
    setBtnLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/update/profile`,
        { name, phoneNumber, bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setBtnLoading(false);
    }
  }

  async function logoutUser() {
    Cookies.set("token", "");
    setUser(null);
    setIsAuth(false);
    toast.success("Logged out successfully");
  }

  async function addSkill(
    skill: string,
    setSkill: React.Dispatch<React.SetStateAction<string>>
  ) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${user_service}/api/user/skill/add`,
        { skillName: skill },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      setSkill("");
      fetchUser();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add skill");
    } finally {
      setBtnLoading(false);
    }
  }

  async function removeSkill(skill: string) {
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/skill/delete`,
        { skillName: skill },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to remove skill");
    }
  }

  async function applyJob(job_id: number) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${user_service}/api/user/apply/job`,
        { job_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      await fetchApplications();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to apply for job");
    } finally {
      setBtnLoading(false);
    }
  }

  const [applications, setApplications] = useState<Application[]>([]);

  async function fetchApplications() {
    try {
      const { data } = await axios.get(
        `${user_service}/api/user/application/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);
 
  async function fetchNotifications() {
    try {
      const { data } = await axios.get(
        `${user_service}/api/user/notification/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      console.log("Notifications fetched:", data);
      setNotifications(data);
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  }
 
  async function markAsRead(id: number) {
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/notification/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      toast.success(data.message);
      fetchNotifications();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to mark as read"
      );
    }
  }
 
  useEffect(() => {
    fetchUser();
    fetchApplications();
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);
 
  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        btnLoading,
        setUser,
        isAuth,
        setIsAuth,
        setLoading,
        logoutUser,
        updateProfilePic,
        updateResume,
        updateUser,
        addSkill,
        removeSkill,
        applyJob,
        applications,
        fetchApplications,
        notifications,
        fetchNotifications,
        markAsRead,
      }}
    >
      {children}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within AppProvider");
  }
  return context;
};


