import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/*
        ADMIN LAYOUT (Restricted)
        - Used for pipeline, audit, calibration
        - TODO: ADMIN role enforcement
        - TODO: Capability checks (no role hierarchy)
        - TODO: Mandatory audit logging on actions
        - TODO: Kill-switch / maintenance banners
      */}
      {children}
    </>
  );
}
