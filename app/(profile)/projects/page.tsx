// app/(profile)/projects/page.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import {
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

interface Project {
  _id: string;
  projectName: string;
  slug: string;
  description: string;
  projectImage?: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "ACTIVE" | "IN_PROGRESS" | "COMPLETED";
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(
    []
  );

  const [pagination, setPagination] =
    useState<Pagination>({
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    });

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState("ALL");

  const fetchProjects = async (
    page = 1
  ) => {
    try {
      setLoading(true);

      const response = await api.get(
        "/projects",
        {
          params: {
            page,
            limit: 10,
            search:
              search || undefined,
            status:
              status !== "ALL"
                ? status
                : undefined,
          },
        }
      );

      console.log(response.data);

      const data =
        response.data?.data;

      setProjects(
        Array.isArray(data?.projects)
          ? data.projects
          : []
      );

      setPagination(
        data?.pagination || {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
        }
      );
    } catch (error) {
      console.error(error);

      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(1);
  }, [search, status]);

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/projects/${id}`
      );

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !== id
        )
      );

      alert(
        "Project deleted successfully"
      );
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data
          ?.message ||
          "Failed to delete project"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Projects
            </h1>

            <p className="mt-2 text-slate-400">
              Manage all your projects
            </p>
          </div>

          <Link
            href="/projects/add"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
          >
            Create Project
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:flex-row md:items-center">
          
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-3.5 text-slate-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search project..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="ACTIVE">
              ACTIVE
            </option>

            <option value="IN_PROGRESS">
              IN_PROGRESS
            </option>

            <option value="COMPLETED">
              COMPLETED
            </option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
          <table className="w-full">
            <thead className="border-b border-slate-800 bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Project Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Slug
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Tech Stack
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    Loading projects...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    No projects found
                  </td>
                </tr>
              ) : (
                projects.map(
                  (project) => (
                    <tr
                      key={project._id}
                      className="border-b border-slate-800 transition hover:bg-slate-800/40"
                    >
                      <td className="px-6 py-4 text-white">
                        {
                          project.projectName
                        }
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {project.slug}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-400">
                          {
                            project.status
                          }
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {project.techStack?.join(
                          ", "
                        ) || "-"}
                      </td>

                   <td className="px-6 py-4">
  <div className="flex flex-wrap items-center gap-3">
    
    {/* Edit */}
    <Link
      href={`/projects/${project._id}`}
      className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm text-white transition hover:bg-slate-700"
    >
      <Pencil size={16} />
      Edit
    </Link>

    {/* Add Member */}
    <Link
      href={`/users/${project._id}`}
      className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white transition hover:bg-emerald-700"
    >
      Add Member
    </Link>

    {/* Delete */}
    <button
      onClick={() =>
        handleDelete(project._id)
      }
      className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700"
    >
      <Trash2 size={16} />
      Delete
    </button>
  </div>
</td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Total Projects:{" "}
            {pagination.total}
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={
                pagination.page === 1
              }
              onClick={() =>
                fetchProjects(
                  pagination.page - 1
                )
              }
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm text-slate-300">
              Page{" "}
              {pagination.page} of{" "}
              {
                pagination.totalPages
              }
            </span>

            <button
              disabled={
                pagination.page ===
                pagination.totalPages
              }
              onClick={() =>
                fetchProjects(
                  pagination.page + 1
                )
              }
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}