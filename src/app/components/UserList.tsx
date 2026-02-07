"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  email: string;
}

interface UserListProps {
  onSelectUser: (user: User) => void;
  currentUser: User;
  unreadMessages: Record<string, number>;
  updateUnreadMessages: (userId: string, count: number) => void;
  clearUnreadMessages: (userId: string) => void;
}

export default function UserList({
  onSelectUser,
  currentUser,
  unreadMessages,
  updateUnreadMessages,
  clearUnreadMessages
}: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();

    const cleanup = setupMessageListener();

    return cleanup;
  }, [currentUser.id, unreadMessages, updateUnreadMessages]);

  const setupMessageListener = () => {
    const channel = supabase
      .channel('new_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMessage = payload.new as any;
          console.log('New message received:', newMessage);
          if (newMessage.receiver_id === currentUser.id && newMessage.sender_id !== currentUser.id) {
            console.log('Updating unread count for user:', newMessage.sender_id);
            updateUnreadMessages(newMessage.sender_id, (unreadMessages[newMessage.sender_id] || 0) + 1);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("id, email");

      if (error) throw error;

      // Filter out current user
      const otherUsers = (data || []).filter((u: User) => u.id !== currentUser.id);
      setUsers(otherUsers);
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (user: User) => {
    clearUnreadMessages(user.id);
    onSelectUser(user);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-800 to-gray-900 transition-colors duration-300">
      {loading ? (
        <div className="p-4 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400 mb-2"></div>
          <p className="text-gray-500 text-sm font-medium">Finding friends...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="p-4 text-center">
          <div className="text-4xl mb-2">🦄</div>
          <p className="font-bold text-gray-400 mb-1">No squad yet</p>
          <p className="text-xs text-gray-500">Add more accounts to start the vibe!</p>
        </div>
      ) : (
        <div className="space-y-2 p-3">
          <p className="px-3 py-2 text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 uppercase tracking-wider">
            🔥 Online Squad ({users.length})
          </p>
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSelectUser(user)}
              className="w-full text-left p-4 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-pink-900/20 transition-all duration-300 rounded-2xl relative group shadow-sm hover:shadow-md border border-gray-700 hover:border-purple-600"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {user.email[0].toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-200 text-sm truncate">{user.email}</p>
                  <p className="text-xs text-gray-500">Tap to chat</p>
                </div>
                {unreadMessages[user.id] > 0 && (
                  <div className="relative">
                    <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce shadow-lg">
                      {unreadMessages[user.id] > 9 ? '9+' : unreadMessages[user.id]}
                    </div>
                    <div className="absolute inset-0 bg-red-500 rounded-full w-6 h-6 animate-ping opacity-75"></div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
