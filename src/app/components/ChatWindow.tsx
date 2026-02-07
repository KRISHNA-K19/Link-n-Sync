"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import InviteModal from "./InviteModal";

interface User {
  id: string;
  email: string;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

interface ChatWindowProps {
  selectedUser: User;
  currentUser: User;
}

export default function ChatWindow({
  selectedUser,
  currentUser,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    loadMessages();
    setupRealtimeListener();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [selectedUser, channel]);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${currentUser.id},receiver_id.eq.${selectedUser.id}),and(sender_id.eq.${selectedUser.id},receiver_id.eq.${currentUser.id})`
        )
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeListener = async () => {
    const channelName = `chat_${[currentUser.id, selectedUser.id].sort().join('_')}`;
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload: any) => {
          const newMessage = payload.new as Message;
          if (
            (newMessage.sender_id === currentUser.id &&
              newMessage.receiver_id === selectedUser.id) ||
            (newMessage.sender_id === selectedUser.id &&
              newMessage.receiver_id === currentUser.id)
          ) {
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    setChannel(channel);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const { data, error } = await supabase.from("messages").insert([
        {
          sender_id: currentUser.id,
          receiver_id: selectedUser.id,
          content: input,
        },
      ]).select();

      if (error) throw error;
      if (data) {
        setMessages(prev => [...prev, ...data]);
      }
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      {/* Chat Header */}
      <div className="p-4 border-b border-purple-700/50 bg-gradient-to-r from-purple-700 to-pink-700 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white font-black">
            {selectedUser.email[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-black">{selectedUser.email}</h2>
            <p className="text-xs text-purple-100">🟢 Online now</p>
          </div>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-2xl hover:bg-white/30 transition-all duration-300 text-sm font-black hover:scale-105"
        >
          📧 Invite
        </button>
      </div>

      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        toEmail={selectedUser.email}
        fromEmail={currentUser.email}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-800 to-gray-900 transition-colors duration-300">
        {loading ? (
          <div className="text-center text-gray-500 mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mb-4"></div>
            <p className="font-medium">Loading vibes...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <p className="font-black text-gray-400 mb-2">Start the convo!</p>
            <p className="text-sm text-gray-500">Send a message to get this party started 🎊</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender_id === currentUser.id ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl shadow-md ${msg.sender_id === currentUser.id
                  ? "bg-gradient-to-r from-purple-700 to-pink-700 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-200 rounded-bl-none border border-purple-600"
                  }`}
              >
                <p className="font-medium">{msg.content}</p>
                <p
                  className={`text-xs mt-2 font-medium ${msg.sender_id === currentUser.id
                    ? "text-purple-100"
                    : "text-gray-500"
                    }`}
                >
                  {new Date(msg.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t border-purple-700/50 bg-gray-800/80 backdrop-blur-lg flex gap-3 transition-colors duration-300"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a vibe..."
          className="flex-1 px-4 py-3 border border-purple-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-200 bg-gray-700 placeholder-gray-500 font-medium"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-700 to-pink-700 text-white rounded-2xl hover:from-purple-800 hover:to-pink-800 transition-all duration-300 font-black shadow-lg hover:shadow-xl hover:scale-105"
        >
          Send ✨
        </button>
      </form>
    </>
  );
}
