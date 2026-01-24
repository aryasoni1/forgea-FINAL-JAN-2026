import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/*
        APP LAYOUT (Authenticated)
        - Sidebar + navigation will live here later
        - Used for Dashboard, Resume Mapper, Settings
        - TODO: Auth Guard (session required)
        - TODO: RBAC Gate (Candidate / Recruiter / Admin)
        - TODO: Notification + Activity Providers
        - TODO: Reproduction Gate (blocked users)
      */}
      {children}
    </>
  );
}
