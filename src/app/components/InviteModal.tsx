"use client";

import { useState } from "react";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  toEmail: string;
  fromEmail: string;
}

export default function InviteModal({
  isOpen,
  onClose,
  toEmail,
  fromEmail,
}: InviteModalProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSendInvite = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/send-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail,
          fromEmail,
          inviteMessage: message || "Join me for a chat!",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setMessage("");
          setStatus("idle");
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📧 Invite to Chat
        </h2>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Sending to:</p>
          <p className="font-semibold text-gray-800">{toEmail}</p>
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a personal message... (optional)"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
        />

        {status === "success" && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm">
            ✓ Invite sent successfully!
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
            ✗ Failed to send invite. Please try again.
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSendInvite}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold disabled:bg-gray-400"
          >
            {loading ? "Sending..." : "Send Invite"}
          </button>
        </div>
      </div>
    </div>
  );
}
