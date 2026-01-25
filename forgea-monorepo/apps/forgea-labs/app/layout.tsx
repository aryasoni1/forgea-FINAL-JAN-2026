import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-screen">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} h-screen min-h-screen overflow-hidden bg-slate-950 font-sans text-slate-100`}
      >
        {/*
          ROOT SHELL
          - Global providers go here later (Theme, Error Boundary, Telemetry)
          - Do NOT add auth logic here
          TODO: Enforce overflow-hidden on body/root to prevent browser scroll
          TODO: Inject Auth Guard at layout boundary (later)
        */}
        <div className="grid h-screen grid-cols-[16rem_1fr] bg-slate-950">
          <aside className="w-64 border-r border-slate-800">
            {/* TODO: Replace sidebar with shadcn/ui <ResizablePanelGroup> */}
            <Sidebar />
          </aside>
          <div className="grid h-screen grid-rows-[3rem_1fr]">
            <header className="h-12 border-b border-slate-800">
              <TicketHeader />
            </header>
            <main className="flex-1 overflow-hidden">
              <MainWorkspace />
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

function Sidebar() {
  return <div className="h-full" />;
}

function TicketHeader() {
  return <div className="h-full" />;
}

function MainWorkspace() {
  return <div className="h-full" />;
}
