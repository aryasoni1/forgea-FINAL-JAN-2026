"use client";

import React, { useState } from "react";
import { WorkspaceActionBar } from "@/components/workspace/action-bar";
import { FileExplorer } from "@/components/workspace/file-explorer";
import { MonacoEditor } from "@/components/workspace/monaco-editor";
import { IncidentTicketDrawer } from "@/components/workspace/incident-drawer";
import { TruthMachineConsole } from "@/components/workspace/console";
import { VerificationOverlay } from "@/components/workspace/verification-overlay";
import { PushNotification } from "@/components/workspace/push-notification";
import { SuccessModal } from "@/components/workspace/success-modal";
import { FailureClassification } from "@/components/workspace/failure-classification";
import { MDXLessonSidebar } from "@/components/workspace/mdx-sidebar";
import { ProofDiffViewer } from "@/components/workspace/proof-diff";

export interface WorkspaceState {
  selectedFile: string | null;
  isVerifying: boolean;
  verificationSuccess: boolean | null;
  showSuccessModal: boolean;
  showFailureUI: boolean;
  showDiffViewer: boolean;
  consoleLogs: Array<{
    type: "scanning" | "complete" | "error";
    message: string;
  }>;
  activeNotification: null | {
    type: "webhook" | "success" | "error";
    message: string;
  };
}

export default function MainShell() {
  const [state, setState] = useState<WorkspaceState>({
    selectedFile: "src/hooks/useAuth.ts",
    isVerifying: false,
    verificationSuccess: null,
    showSuccessModal: false,
    showFailureUI: false,
    showDiffViewer: false,
    consoleLogs: [],
    activeNotification: null,
  });

  const handleVerifyNow = () => {
    setState((prev) => ({
      ...prev,
      isVerifying: true,
      consoleLogs: [
        { type: "scanning" as const, message: "[SCANNING] Heap used: 42MB..." },
      ],
    }));

    // Simulate verification
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        consoleLogs: [
          ...prev.consoleLogs,
          {
            type: "scanning" as const,
            message: "[SCANNING] AST traversal: 89% complete",
          },
        ],
      }));
    }, 1000);

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        consoleLogs: [
          ...prev.consoleLogs,
          {
            type: "complete" as const,
            message: "[COMPLETE] Signal verified in 2.3s",
          },
        ],
        isVerifying: false,
        verificationSuccess: true,
        showSuccessModal: true,
      }));
    }, 3000);
  };

  const handleResetInstance = () => {
    setState({
      selectedFile: "src/hooks/useAuth.ts",
      isVerifying: false,
      verificationSuccess: null,
      showSuccessModal: false,
      showFailureUI: false,
      showDiffViewer: false,
      consoleLogs: [],
      activeNotification: null,
    });
  };

  const handleCloseSuccess = () => {
    setState((prev) => ({ ...prev, showSuccessModal: false }));
  };

  return (
    <div className="h-screen w-screen bg-black text-gray-200 font-sans overflow-hidden">
      {/* Action Bar */}
      <WorkspaceActionBar
        onVerify={handleVerifyNow}
        onReset={handleResetInstance}
        onSubmitProof={() => {}}
        isVerifying={state.isVerifying}
      />

      {/* Main 3-Column Layout */}
      <div className="flex h-[calc(100vh-52px)]">
        {/* Sidebar: File Explorer + MDX Lesson */}
        <div className="flex flex-col w-64 border-r border-white/10 bg-black">
          <FileExplorer
            selectedFile={state.selectedFile}
            onSelectFile={(file) =>
              setState((prev) => ({ ...prev, selectedFile: file }))
            }
          />
          <div className="flex-1 border-t border-white/10 overflow-hidden">
            <MDXLessonSidebar />
          </div>
        </div>

        {/* Center: Editor + Console */}
        <div className="flex flex-col flex-1 border-r border-white/10">
          <MonacoEditor
            selectedFile={state.selectedFile}
            isLocked={state.isVerifying}
          />
          <div className="h-48 border-t border-white/10 bg-black">
            <TruthMachineConsole logs={state.consoleLogs} />
          </div>
        </div>

        {/* Right: Incident Ticket + Proof Diff */}
        <div className="flex flex-col w-80 border-white/10 bg-black overflow-hidden">
          {state.showDiffViewer ? (
            <ProofDiffViewer
              onClose={() =>
                setState((prev) => ({ ...prev, showDiffViewer: false }))
              }
            />
          ) : (
            <>
              <IncidentTicketDrawer
                onShowDiff={() =>
                  setState((prev) => ({ ...prev, showDiffViewer: true }))
                }
              />
              {state.showFailureUI && (
                <div className="flex-1 border-t border-white/10 overflow-y-auto">
                  <FailureClassification />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Overlays & Modals */}
      {state.isVerifying && <VerificationOverlay />}

      {state.activeNotification && (
        <PushNotification
          type={state.activeNotification.type}
          message={state.activeNotification.message}
        />
      )}

      {state.showSuccessModal && <SuccessModal onClose={handleCloseSuccess} />}
    </div>
  );
}
