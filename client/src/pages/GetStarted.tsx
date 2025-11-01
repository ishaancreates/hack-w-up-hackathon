import { useState } from "react";
import { InteractiveGridPattern } from "../components/ui/interactive-grid-pattern";
import { cn } from "../utils";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";

export default function GetStarted() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Background grid */}
      <InteractiveGridPattern
        className={cn(
          "fixed inset-0 h-screen w-screen border-0 select-none opacity-30",
          "[mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]",
        )}
        squaresClassName="hover:fill-purple-400/30 transition-all duration-300"
        width={60}
        height={42}
        squares={[26, 26]}
      />

      {/* Content */}
      <section className="relative z-10 mx-auto flex h-screen w-full max-w-7xl items-center justify-center px-6 pb-10">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Branding */}
          <div className="hidden md:block space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Curalynx
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI Healthcare Platform</p>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to the Future of
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Medical Practice
                </span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Join thousands of healthcare professionals using AI to streamline patient care and documentation.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: ShieldCheck, text: "HIPAA Compliant & Secure", color: "text-green-600" },
                { icon: Sparkles, text: "AI-Powered Transcription", color: "text-yellow-600" },
                { icon: User, text: "Seamless Integration", color: "text-blue-600" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                  <feature.icon className={cn("w-6 h-6", feature.color)} />
                  <span className="font-medium text-gray-900 dark:text-white">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full">
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-2xl p-8">
              {/* Toggle */}
              <div className="mb-8 inline-flex rounded-2xl border border-gray-200/50 bg-gray-50/50 dark:bg-gray-800/50 p-1.5 w-full shadow-inner">
                <button
                  onClick={() => setMode("signin")}
                  className={cn(
                    "flex-1 rounded-xl px-6 py-3 font-semibold text-sm transition-all duration-300",
                    mode === "signin" 
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={cn(
                    "flex-1 rounded-xl px-6 py-3 font-semibold text-sm transition-all duration-300",
                    mode === "signup" 
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  Sign Up
                </button>
              </div>

              {mode === "signin" ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Signed in (demo)");
                  }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Welcome Back
                    <span className="block text-lg font-normal text-gray-600 dark:text-gray-400 mt-2">
                      Sign in to continue to your dashboard
                    </span>
                  </h2>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-indigo-600" />
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        required 
                        className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3.5 text-sm transition-all duration-300 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none" 
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Lock className="w-4 h-4 text-indigo-600" />
                        Password
                      </label>
                      <input 
                        type="password" 
                        required 
                        className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3.5 text-sm transition-all duration-300 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none" 
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        Remember me
                      </label>
                      <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                        Forgot password?
                      </a>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Account created (demo)");
                  }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Create Account
                    <span className="block text-lg font-normal text-gray-600 dark:text-gray-400 mt-2">
                      Join thousands of healthcare professionals
                    </span>
                  </h2>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <User className="w-4 h-4 text-indigo-600" />
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        required 
                        className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3.5 text-sm transition-all duration-300 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none" 
                        placeholder="Dr. John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-indigo-600" />
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        required 
                        className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3.5 text-sm transition-all duration-300 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none" 
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Lock className="w-4 h-4 text-indigo-600" />
                        Password
                      </label>
                      <input 
                        type="password" 
                        required 
                        minLength={6} 
                        className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3.5 text-sm transition-all duration-300 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none" 
                        placeholder="••••••••"
                      />
                      <p className="mt-1.5 text-xs text-gray-500">Must be at least 6 characters</p>
                    </div>
                    
                    <label className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span>I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">Privacy Policy</a></span>
                    </label>
                    
                    <button 
                      type="submit" 
                      className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-6 text-center">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Add animations to CSS */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}
