// app/(profile)/projects/[id]/member/page.tsx

"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import toast from "react-hot-toast";

import {
  Loader2,
  UserPlus,
} from "lucide-react";

import { api } from "@/app/lib/api";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export default function AddMemberPage() {
  const { id } = useParams();

  const [users, setUsers] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [addingUserId, setAddingUserId] =
    useState<string | null>(null);

const fetchUsers = async () => {
  try {
    setLoading(true);

    const response =
      await api.get("/users");

    const usersData =
      response.data?.data || [];

    setUsers(
      Array.isArray(usersData)
        ? usersData
        : []
    );
  } catch (error: any) {
    toast.error(
      error?.response?.data
        ?.message ||
        "Failed to fetch users"
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddMember =
    async (userId: string) => {
      try {
        setAddingUserId(userId);

        await api.post(
          `/projects/${id}/members`,
          {
            userId,
            role:
              "PROJECT_MEMBER",
          }
        );

        toast.success(
          "Member added successfully"
        );
      } catch (error: any) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to add member"
        );
      } finally {
        setAddingUserId(null);
      }
    };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Add Members
          </h1>

          <p className="mt-2 text-slate-400">
            Add users to your project
            workspace.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
          <table className="w-full">
            <thead className="border-b border-slate-800 bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Username
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" />
                      Loading users...
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-slate-800 transition hover:bg-slate-800/40"
                  >
                    {/* Username */}
                    <td className="px-6 py-4 text-white">
                      {user.username}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-slate-300">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-400">
                        {user.role}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleAddMember(
                            user._id
                          )
                        }
                        disabled={
                          addingUserId ===
                          user._id
                        }
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {addingUserId ===
                        user._id ? (
                          <>
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                            Adding...
                          </>
                        ) : (
                          <>
                            <UserPlus
                              size={16}
                            />
                            Add Member
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}