// app/(profile)/projects/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Loader2,
  ArrowLeft,
} from "lucide-react";

import { api } from "@/app/lib/api";

export default function EditProjectPage() {
  const { id } = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
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

  const fetchProject =
    async () => {
      try {
        const response =
          await api.get(
            `/projects/${id}`
          );

        const project =
          response.data?.data;

        setFormData({
          projectName:
            project?.projectName ||
            "",
          slug:
            project?.slug || "",
          description:
            project?.description ||
            "",
          projectImage:
            project?.projectImage ||
            "",
          techStack:
            project?.techStack?.join(
              ", "
            ) || "",
          githubUrl:
            project?.githubUrl ||
            "",
          liveUrl:
            project?.liveUrl ||
            "",
          status:
            project?.status ||
            "ACTIVE",
        });
      } catch (error: any) {
        console.error(error);

        alert(
          error?.response?.data
            ?.message ||
            "Failed to fetch project"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

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

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setUpdating(true);

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
        await api.patch(
          `/projects/${id}`,
          payload
        );

      console.log(response.data);

      alert(
        "Project updated successfully"
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
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        
        {/* Back Button */}
        <button
          onClick={() =>
            router.back()
          }
          className="mb-6 flex items-center gap-2 text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white">
              Edit Project
            </h1>

            <p className="mt-2 text-slate-400">
              Update your project
              details and settings.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={
              handleUpdate
            }
            className="space-y-8"
          >
            
            {/* Basic Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Project Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Project Name
                </label>

                <input
                  type="text"
                  name="projectName"
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
                rows={6}
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* URLs */}
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Project Image
                </label>

                <input
                  type="url"
                  name="projectImage"
                  value={
                    formData.projectImage
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  GitHub URL
                </label>

                <input
                  type="url"
                  name="githubUrl"
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
                value={
                  formData.techStack
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />

              <p className="mt-2 text-xs text-slate-500">
                Separate
                technologies using
                commas
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={updating}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
            >
              {updating && (
                <Loader2
                  size={20}
                  className="animate-spin"
                />
              )}

              {updating
                ? "Updating Project..."
                : "Update Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}