"use client";

import React, { useEffect, useState } from "react";
import { Bell, Webhook, AlertCircle, CheckCircle2 } from "lucide-react";

interface PushNotificationProps {
  type: "webhook" | "success" | "error";
  message: string;
}

export function PushNotification({ type, message }: PushNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const getStyles = () => {
    switch (type) {
      case "webhook":
        return "bg-blue-500/20 border-blue-500/30 text-blue-300";
      case "success":
        return "bg-emerald-500/20 border-emerald-500/30 text-emerald-300";
      case "error":
        return "bg-rose-500/20 border-rose-500/30 text-rose-300";
      default:
        return "bg-gray-500/20 border-gray-500/30 text-gray-300";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "webhook":
        return <Webhook size={14} />;
      case "success":
        return <CheckCircle2 size={14} />;
      case "error":
        return <AlertCircle size={14} />;
      default:
        return <Bell size={14} />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-in slide-in-from-right-2 fade-in-0 duration-300">
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded border ${getStyles()}`}
      >
        {getIcon()}
        <span className="text-xs font-medium">{message}</span>
      </div>
    </div>
  );
}
