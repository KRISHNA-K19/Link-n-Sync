"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ChatApp from "./components/ChatApp";

interface User {
  id: string;
  email: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id && session?.user?.email) {
        setUser({ id: session.user.id, email: session.user.email });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.id && session?.user?.email) {
        setUser({ id: session.user.id, email: session.user.email });
      } else {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  if (!mounted) return null;
  if (loading) return <LoadingScreen />;
  if (!user) return <AuthPage />;

  return <ChatApp user={user} />;
}

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-800 via-pink-800 to-blue-800">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-white mb-6"></div>
        <p className="text-white text-xl font-black animate-pulse">Loading the vibe...</p>
      </div>
    </div>
  );
}

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Check your email for verification!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-800 via-pink-800 to-blue-800">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-96 border border-white/20">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🤝</div>
          <h1 className="text-4xl font-black text-white mb-2">Link n Sync</h1>
          <p className="text-purple-100 font-medium">Where the squad connects</p>
        </div>

        <h2 className="text-2xl font-black text-center mb-6 text-white">
          {isSignUp ? "Join the vibe" : "Enter the vibe"}
        </h2>

        {error && <div className="bg-red-500/20 backdrop-blur text-red-100 p-3 rounded-2xl mb-4 text-sm font-medium border border-red-500/30">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/20 backdrop-blur border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 font-medium"
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/20 backdrop-blur border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 font-medium"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-black shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Getting ready..." : isSignUp ? "Join VibeChat ✨" : "Enter VibeChat 🔥"}
          </button>
        </form>

        <p className="text-center mt-6 text-purple-100">
          {isSignUp ? "Already in the squad?" : "New to the squad?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-white font-black hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
