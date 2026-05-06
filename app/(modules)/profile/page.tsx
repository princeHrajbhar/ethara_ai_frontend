"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/app/lib/api";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const [logoutLoading, setLogoutLoading] =
    useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await api.get("/users/me");

      setUser(response.data?.data);
    } catch (error: any) {
      console.error(error);

      if (
        error?.response?.status === 401 ||
        error?.response?.status === 403
      ) {
        router.push("/auth/login");
        return;
      }

      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await api.post("/auth/logout");

      router.push("/auth/login");
    } catch (error) {
      console.error(error);

      router.push("/auth/login");
    } finally {
      setLogoutLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F172A] text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

          {/* Top Section */}
          <div className="flex flex-col items-center">

            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-3xl font-bold uppercase">
              {user?.username?.charAt(0)}
            </div>

            {/* User Info */}
            <h1 className="mt-4 text-3xl font-bold">
              {user?.username}
            </h1>

            <p className="mt-1 text-slate-400">
              {user?.email}
            </p>

            <span className="mt-3 rounded-full bg-indigo-500/20 px-4 py-1 text-sm font-medium text-indigo-400">
              {user?.role}
            </span>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="mt-6 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {logoutLoading
                ? "Logging out..."
                : "Logout"}
            </button>
          </div>

          {/* Info Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div className="rounded-xl bg-slate-800 p-5">
              <p className="text-sm text-slate-400">
                User ID
              </p>

              <h3 className="mt-2 break-all text-lg font-semibold">
                {user?._id}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-800 p-5">
              <p className="text-sm text-slate-400">
                Account Role
              </p>

              <h3 className="mt-2 text-lg font-semibold capitalize">
                {user?.role}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-800 p-5 md:col-span-2">
              <p className="text-sm text-slate-400">
                Joined At
              </p>

              <h3 className="mt-2 text-lg font-semibold">
                {user?.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleString()
                  : "N/A"}
              </h3>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}