import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/*
          ROOT SHELL
          - Global providers go here later (Theme, Error Boundary, Telemetry)
          - Do NOT add auth logic here
        */}
        {children}
      </body>
    </html>
  );
}
