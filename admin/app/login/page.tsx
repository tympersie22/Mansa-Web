'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase is not configured. Add environment variables and try again.');
      return;
    }

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message || 'Invalid email or password');
        return;
      }
      router.push('/');
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#161715] flex items-center justify-center p-4">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#fbb040] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-[#2a2417] font-bold text-2xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Mansa Tours & Travel</h1>
          <p className="text-gray-400 mt-1">Itinerary Builder Admin</p>
        </div>

        <div className="bg-[#22231f] rounded-xl border border-[#3a3d36] p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Sign in to your account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mansa.travel"
                  className="w-full bg-[#2d302a] border border-[#484c44] rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#fbb040] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#2d302a] border border-[#484c44] rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#fbb040] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#fbb040] hover:bg-[#f1a52f] text-[#241f15] py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">Mansa itinerary and journey planning workspace</p>
      </motion.div>
    </div>
  );
}
