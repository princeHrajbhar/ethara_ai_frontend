// app/(profile)/projects/add/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { api } from "@/app/lib/api";

export default function CreateProjectPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      projectName: "",
      slug: "",
      description: "",
      projectImage: "",
      techStack: "",
      githubUrl: "",
      liveUrl: "",
      status: "ACTIVE",
    });

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        techStack:
          formData.techStack
            .split(",")
            .map((item) =>
              item.trim()
            )
            .filter(Boolean),
      };

      const response =
        await api.post(
          "/projects",
          payload
        );

      console.log(response.data);

      alert(
        "Project created successfully"
      );

      router.push("/projects");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data
          ?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">
            Create Project
          </h1>

          <p className="mt-2 text-slate-400">
            Create and manage your
            new project workspace.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          
          {/* Basic Info */}
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Project Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Project Name
              </label>

              <input
                type="text"
                name="projectName"
                placeholder="Ethara AI"
                value={
                  formData.projectName
                }
                onChange={
                  handleChange
                }
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                placeholder="ethara-ai"
                value={
                  formData.slug
                }
                onChange={
                  handleChange
                }
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Write project description..."
              rows={6}
              value={
                formData.description
              }
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          {/* URLs */}
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Project Image */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Project Image URL
              </label>

              <input
                type="url"
                name="projectImage"
                placeholder="https://image-url.com"
                value={
                  formData.projectImage
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                GitHub URL
              </label>

              <input
                type="url"
                name="githubUrl"
                placeholder="https://github.com/project"
                value={
                  formData.githubUrl
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />
            </div>
          </div>

          {/* More Fields */}
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Live URL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Live URL
              </label>

              <input
                type="url"
                name="liveUrl"
                placeholder="https://project.com"
                value={
                  formData.liveUrl
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Status
              </label>

              <select
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              >
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
          </div>

          {/* Tech Stack */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Tech Stack
            </label>

            <input
              type="text"
              name="techStack"
              placeholder="Node.js, Express.js, MongoDB"
              value={
                formData.techStack
              }
              onChange={
                handleChange
              }
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />

            <p className="mt-2 text-xs text-slate-500">
              Separate technologies
              using commas
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading && (
              <Loader2
                size={20}
                className="animate-spin"
              />
            )}

            {loading
              ? "Creating Project..."
              : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}