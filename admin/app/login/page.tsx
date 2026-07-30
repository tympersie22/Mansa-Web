'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/itineraries',
      });
      if (!result?.ok) {
        setError('Invalid credentials or Mansa OS access has not been provisioned.');
        return;
      }
      // Force a fresh session read after Auth.js writes the JWT cookie.
      window.location.assign(result.url || '/itineraries');
    } catch {
      setError('Mansa OS could not sign you in. Please retry.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-dark text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(251,176,64,0.18),transparent_28rem),linear-gradient(135deg,#2f302d_0%,#383836_52%,#242522_100%)]" />
      <div className="absolute -left-24 top-1/3 h-80 w-80 rounded-full border border-white/[0.06]" />
      <div className="absolute -left-8 top-[42%] h-52 w-52 rounded-full border border-accent/15" />

      <div className="relative grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden flex-col justify-between border-r border-white/10 p-12 lg:flex xl:p-16">
          <div>
            <p className="font-heading text-2xl tracking-[0.2em]">MANSA OS</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.32em] text-white/42">
              Travel operating system
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="os-kicker">Built for considered travel</p>
            <h1 className="mt-6 text-5xl leading-[1.08] xl:text-6xl">
              Every journey,
              <br />
              held in one place.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/55">
              Mansa OS connects guest relationships, trusted partners, itinerary design, and
              commercial decisions into one controlled operational workspace.
            </p>
          </motion.div>

          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
            Mansa Tours & Travel · Zanzibar
          </p>
        </section>

        <section className="flex items-center justify-center p-5 sm:p-10 lg:p-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            <div className="mb-9 lg:hidden">
              <p className="font-heading text-xl tracking-[0.18em]">MANSA OS</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.28em] text-white/42">
                Travel operating system
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl sm:p-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                Secure workspace
              </p>
              <h2 className="mt-4 text-3xl">Welcome back</h2>
              <p className="mt-3 text-sm leading-6 text-white/48">
                Sign in with your provisioned Mansa OS account.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className="block">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/52">
                    Email address
                  </span>
                  <span className="relative block">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="admin@mansa.travel"
                      className="w-full rounded-2xl border border-white/12 bg-black/10 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/26 focus:border-accent focus:ring-2 focus:ring-accent/15"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/52">
                    Password
                  </span>
                  <span className="relative block">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-white/12 bg-black/10 py-3.5 pl-11 pr-12 text-sm text-white outline-none placeholder:text-white/26 focus:border-accent focus:ring-2 focus:ring-accent/15"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                </label>

                {error ? (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                    <p className="text-sm leading-6 text-red-200">{error}</p>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-surface-dark transition duration-300 hover:bg-accent-light disabled:cursor-wait disabled:opacity-60"
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-surface-dark/30 border-t-surface-dark" />
                  ) : null}
                  {loading ? 'Signing in' : 'Enter Mansa OS'}
                  {!loading ? <ArrowRight className="h-4 w-4" /> : null}
                </button>
              </form>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
