import type { ReactNode } from "react";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/*
        WORKSPACE / FOCUS MODE
        - NO sidebar
        - NO global navigation
        - Full-screen work environment
        - Used for /ticket/[labId]
        - TODO: Auth Guard (strict)
        - TODO: Lab ownership check
        - TODO: Stuck Detection Provider
        - TODO: Execution / Telemetry context
      */}
      {children}
    </>
  );
}
