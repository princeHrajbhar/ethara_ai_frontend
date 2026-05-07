// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/app/components/Navbar";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "My App",
  description: "Generated with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Toast Notification */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 3000,

            style: {
              background: "#0f172a",
              color: "#ffffff",
              border:
                "1px solid #334155",
              padding: "14px 16px",
              borderRadius: "14px",
              fontSize: "14px",
            },

            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },

            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}