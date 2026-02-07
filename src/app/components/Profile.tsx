"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  email: string;
}

interface ProfileData {
  id: string;
  email?: string;
  created_at?: string;
  avatar_url?: string;
  username?: string;
  [key: string]: any; // Allow for additional database fields
}

export default function Profile({ user }: { user: User }) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState("");
  const [editingUsername, setEditingUsername] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        console.log('Loading profile for user ID:', user.id);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        console.log('Profile data from database:', data);
        console.log('Profile error:', error);

        if (error) {
          console.error('Database error:', error);
          throw error;
        }

        setProfile(data);
        setUsername(data?.username || "");
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user.id]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setProfile(prev => prev ? { ...prev, avatar_url: publicUrl } : null);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleUsernameUpdate = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, username } : null);
      setEditingUsername(false);
    } catch (error) {
      console.error('Error updating username:', error);
      alert('Failed to update username');
    }
  };

  // Sample avatar for demonstration
  const sampleAvatar = "https://picsum.photos/seed/vibechat-avatar/200/200.jpg";

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mb-4"></div>
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  const joinDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString()
    : "Unknown";

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-background to-muted">
      <div className="space-y-4">
        {/* Profile Header with 3D Avatar */}
        <Card className="border-0 bg-gradient-to-r from-purple-700 to-pink-700 text-white relative overflow-hidden">
          {/* Animated background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-ping"></div>
          </div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-4">
              <div className="relative">
                {/* 3D Animated Avatar */}
                <div className="w-24 h-24 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse opacity-20"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full animate-ping opacity-30"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full shadow-2xl transform-gpu transition-all duration-500 hover:scale-110 hover:rotate-6">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full"></div>
                    <div className="absolute inset-1 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-80"></div>
                    <div className="absolute inset-2 flex items-center justify-center">
                      <div className="text-4xl animate-bounce">🤝</div>
                    </div>
                    {/* 3D Effect Layers */}
                    <div className="absolute inset-0 rounded-full shadow-inner"></div>
                    <div className="absolute top-2 left-2 w-4 h-4 bg-white/30 rounded-full blur-sm"></div>
                    <div className="absolute bottom-3 right-3 w-6 h-6 bg-purple-300/20 rounded-full blur-md"></div>
                  </div>
                </div>
                {/* Floating particles around avatar */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-pink-400 rounded-full animate-ping animation-delay-1000"></div>
                <div className="absolute top-4 -right-3 w-2 h-2 bg-blue-400 rounded-full animate-ping animation-delay-2000"></div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black mb-1 relative">
                  <span className="relative z-10">Your Profile</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse"></div>
                </h2>
                <p className="text-purple-100 text-sm">Link n Sync database information</p>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Database Profile Information */}
        <div className="space-y-3">
          {/* Username - Editable */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-black text-purple-400 uppercase tracking-wider">Username</CardTitle>
            </CardHeader>
            <CardContent>
              {editingUsername ? (
                <div className="flex gap-2">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="flex-1"
                  />
                  <Button onClick={handleUsernameUpdate} size="sm">
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingUsername(false);
                      setUsername(profile?.username || "");
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black">
                    {profile?.username || "No username set"}
                  </p>
                  <Button
                    onClick={() => setEditingUsername(true)}
                    variant="secondary"
                    size="sm"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Display all database fields dynamically */}
          {profile && Object.entries(profile).map(([key, value]) => {
            if (key === 'username') return null; // Skip username as it's handled above

            return (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="text-sm font-black text-purple-400 uppercase tracking-wider">
                    {key.replace(/_/g, ' ')} (Database)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-mono break-all">
                    {value !== null && value !== undefined ? String(value) : 'NULL'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Field: {key} | Type: {typeof value}</p>
                </CardContent>
              </Card>
            );
          })}

          {/* User Authentication Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-black text-purple-400 uppercase tracking-wider">
                Current User Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs font-mono space-y-1">
                <p>ID: {user.id}</p>
                <p>Email: {user.email}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">From current session</p>
            </CardContent>
          </Card>
        </div>

        {/* Database Stats */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">💬</p>
              <p className="text-xs text-purple-400 font-black uppercase tracking-wider mt-2">Messages</p>
              <p className="text-lg font-black">-</p>
              <p className="text-xs text-muted-foreground">From messages table</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">👥</p>
              <p className="text-xs text-purple-400 font-black uppercase tracking-wider mt-2">Contacts</p>
              <p className="text-lg font-black">-</p>
              <p className="text-xs text-muted-foreground">From profiles table</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
