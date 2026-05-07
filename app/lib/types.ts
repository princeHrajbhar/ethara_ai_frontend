export interface Project {
  _id: string;
  projectName: string;
  slug: string;
  description: string;
  projectImage?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "ACTIVE" | "IN_PROGRESS" | "COMPLETED";
}

export interface User {
  _id: string;
  fullName?: string;
  username?: string;
  email: string;
  role?: string;
}