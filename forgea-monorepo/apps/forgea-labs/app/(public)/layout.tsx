import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/*
        PUBLIC LAYOUT
        - MUST remain accessible without authentication
        - Used for /proof/[username] and landing redirects
        - TODO: Explicitly exclude from middleware auth checks
        - TODO: Read-only trust rendering (no mutations)
      */}
      {children}
    </>
  );
}
