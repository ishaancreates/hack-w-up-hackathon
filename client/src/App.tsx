import { InteractiveGridPattern } from "./components/ui/interactive-grid-pattern";
import { cn } from "./utils/index";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sparkles, Brain, Activity, ShieldCheck, Zap, HeartPulse } from "lucide-react";
import "./App.css";

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated gradient background */}
      <div 
        className="fixed inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(99, 102, 241, 0.3), transparent 50%)`
        }}
      />
      
      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Enhanced Background grid */}
      <InteractiveGridPattern
        className={cn(
          "fixed inset-0 h-screen w-screen border-0 select-none opacity-30",
          "[mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]",
        )}
        squaresClassName="hover:fill-indigo-400/30 transition-all duration-300"
        width={60}
        height={42}
        squares={[26, 26]}
      />

      {/* Content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center py-20">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Badge with animation */}
          <div className="flex justify-center mb-4">
            <span 
              className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-xl px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300 shadow-lg"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className={cn(
                "h-2 w-2 rounded-full bg-emerald-500 animate-pulse transition-transform",
                isHovering && "scale-150"
              )} />
              <span className="font-semibold">AI-Powered Healthcare Platform</span>
              <Sparkles className={cn("w-4 h-4 text-yellow-500 transition-transform", isHovering && "animate-spin")} />
            </span>
          </div>

          {/* Main heading with gradient */}
          <h1 className="text-balance text-5xl sm:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Transform Healthcare
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              with Intelligent Automation
            </span>
          </h1>

          {/* Enhanced description */}
          <p className="mt-6 text-pretty text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Curalynx listens, understands, and writes patient notes automatically—
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">so doctors can focus on medicine, not paperwork</span>
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
            {[
              { icon: Brain, text: "AI-Powered", color: "from-blue-500 to-cyan-500" },
              { icon: ShieldCheck, text: "Secure & HIPAA Compliant", color: "from-green-500 to-emerald-500" },
              { icon: Zap, text: "Real-time Processing", color: "from-yellow-500 to-orange-500" }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="group relative p-6 rounded-2xl backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/20 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3 mx-auto transition-transform duration-300",
                  feature.color,
                  "group-hover:scale-110 group-hover:rotate-6"
                )}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              to="/get-started"
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-xl shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/learn-more"
              className="group px-8 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 rounded-xl font-semibold shadow-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Activity className="w-5 h-5" />
              Learn More
              <HeartPulse className="w-5 h-5 group-hover:animate-pulse" />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">99.9%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">HIPAA</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Compliant</div>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute inset-x-0 bottom-8 z-10 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Curalynx</span> by Team BODMAS
          </p>
        </footer>
      </section>

      {/* Add animations to CSS */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </main>
  );
}
