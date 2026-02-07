"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ChatWindow from "./ChatWindow";
import UserList from "./UserList";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  email: string;
}

interface ChatAppProps {
  user: User;
}

type Page = "chat" | "profile";

export default function ChatApp({ user }: ChatAppProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>("chat");
  const [unreadMessages, setUnreadMessages] = useState<Record<string, number>>({});

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const updateUnreadMessages = (userId: string, count: number) => {
    setUnreadMessages(prev => ({
      ...prev,
      [userId]: count
    }));
  };

  const clearUnreadMessages = (userId: string) => {
    setUnreadMessages(prev => {
      const newUnread = { ...prev };
      delete newUnread[userId];
      return newUnread;
    });
  };

  const getTotalUnreadCount = () => {
    return Object.values(unreadMessages).reduce((sum, count) => sum + count, 0);
  };

  const handleSelectUser = (user: User) => {
    clearUnreadMessages(user.id);
    setSelectedUser(user);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      {/* Sidebar */}
      <div className="w-80 bg-background/80 backdrop-blur-lg border-r flex flex-col shadow-xl">
        {/* Header */}
        <Card className="border-0 bg-gradient-to-r from-purple-700 to-pink-700 text-white relative overflow-hidden">
          {/* Enhanced animated background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-ping"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-yellow-400/10 to-purple-400/10 animate-spin-slow"></div>
            {/* Floating orbs */}
            <div className="absolute top-4 left-8 w-3 h-3 bg-yellow-400 rounded-full animate-float opacity-60"></div>
            <div className="absolute top-8 right-12 w-2 h-2 bg-pink-400 rounded-full animate-float-delay-1 opacity-60"></div>
            <div className="absolute bottom-6 left-16 w-4 h-4 bg-blue-400 rounded-full animate-float-delay-2 opacity-60"></div>
            <div className="absolute bottom-4 right-8 w-2 h-2 bg-green-400 rounded-full animate-float-delay-3 opacity-60"></div>
          </div>

          <CardHeader className="relative z-10">
            <CardTitle className="text-3xl font-black flex items-center gap-2 relative">
              <span className="relative z-10 animate-bounce-slow">🤝 Link n Sync</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse"></div>
              {/* Sparkle effects */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full animate-sparkle"></div>
              <div className="absolute -top-2 right-2 w-1 h-1 bg-pink-300 rounded-full animate-sparkle-delay-1"></div>
              <div className="absolute bottom-0 left-2 w-1 h-1 bg-blue-300 rounded-full animate-sparkle-delay-2"></div>
            </CardTitle>
            <p className="text-xs text-purple-100 font-medium animate-pulse-slow">Real-time squad messaging</p>
          </CardHeader>
        </Card>

        {/* Navigation */}
        <div className="flex gap-2 p-4 border-b relative">
          {/* Enhanced background effects for navigation */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 animate-wave"></div>
          {/* Floating particles */}
          <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-400 rounded-full animate-particle-float"></div>
          <div className="absolute top-6 right-8 w-2 h-2 bg-pink-400 rounded-full animate-particle-float-delay-1"></div>
          <div className="absolute bottom-3 left-12 w-1 h-1 bg-blue-400 rounded-full animate-particle-float-delay-2"></div>

          <div className="relative z-10 flex gap-2 w-full">
            <Button
              onClick={() => setCurrentPage("chat")}
              variant={currentPage === "chat" ? "default" : "secondary"}
              className="flex-1 relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 animate-glow-slow"
            >
              {/* Enhanced button background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-purple-400/10 animate-wave-slow"></div>

              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="animate-bounce-slow">💬</span>
                <span className="font-black">Chats</span>
                {getTotalUnreadCount() > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 animate-bounce shadow-lg animate-pulse-slow">
                    {getTotalUnreadCount() > 9 ? '9+' : getTotalUnreadCount()}
                  </Badge>
                )}
              </span>

              {/* Enhanced hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl animate-pulse"></div>

              {/* Sparkle effects on hover */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle transition-all duration-300"></div>
              <div className="absolute bottom-2 right-2 w-1 h-1 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-delay-1 transition-all duration-300"></div>
            </Button>

            <Button
              onClick={() => setCurrentPage("profile")}
              variant={currentPage === "profile" ? "default" : "secondary"}
              className="flex-1 relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 animate-glow-slow"
            >
              {/* Enhanced button background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/10 to-purple-400/10 animate-wave-slow"></div>

              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="animate-bounce-slow">👤</span>
                <span className="font-black">Profile</span>
              </span>

              {/* Enhanced hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl animate-pulse"></div>

              {/* Sparkle effects on hover */}
              <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle transition-all duration-300"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-delay-1 transition-all duration-300"></div>
            </Button>
          </div>
        </div>

        {/* User Info */}
        <Card className="mx-4 mt-4 bg-gradient-to-r from-gray-700 to-purple-700 border-0">
          <CardContent className="pt-6">
            <p className="text-xs text-purple-300 font-black uppercase tracking-wider mb-1">Logged in as</p>
            <p className="text-sm font-black text-gray-200 truncate">{user.email}</p>
          </CardContent>
        </Card>

        {/* Content */}
        {currentPage === "chat" && (
          <UserList
            onSelectUser={handleSelectUser}
            currentUser={user}
            unreadMessages={unreadMessages}
            updateUnreadMessages={updateUnreadMessages}
            clearUnreadMessages={clearUnreadMessages}
          />
        )}
        {currentPage === "profile" && <Profile user={user} />}

        {/* Logout Button */}
        <div className="p-4 mt-auto relative">
          {/* Enhanced background effects for logout */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-pink-900/30 animate-pulse rounded-lg"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20 animate-wave rounded-lg"></div>
          {/* Floating danger particles */}
          <div className="absolute top-2 left-4 w-1 h-1 bg-red-400 rounded-full animate-particle-float"></div>
          <div className="absolute bottom-2 right-6 w-2 h-2 bg-orange-400 rounded-full animate-particle-float-delay-1"></div>

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/30 animate-glow-slow"
          >
            {/* Enhanced button background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-pink-600/30 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20 animate-wave"></div>

            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="animate-bounce-slow">🚪</span>
              <span className="font-black">Log Out</span>
            </span>

            {/* Enhanced hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl animate-pulse"></div>

            {/* Enhanced particle effects on hover */}
            <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300"></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-1000 transition-all duration-300"></div>
            <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-red-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle transition-all duration-300"></div>
            <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-orange-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-delay-1 transition-all duration-300"></div>
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background/50 backdrop-blur-sm">
        {currentPage === "chat" ? (
          selectedUser ? (
            <ChatWindow selectedUser={selectedUser} currentUser={user} />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <div className="text-8xl mb-6 animate-bounce">💭</div>
              <p className="text-2xl font-black mb-2">Choose your vibe</p>
              <p className="text-sm">Pick someone from the squad to start chatting</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg text-muted-foreground">Profile settings coming soon 🔥</p>
          </div>
        )}
      </div>
    </div>
  );
}
