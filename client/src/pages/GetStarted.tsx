import { useState } from "react";
import { InteractiveGridPattern } from "../components/ui/interactive-grid-pattern";
import { cn } from "../utils";

export default function GetStarted() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background grid */}
      <InteractiveGridPattern
        className={cn(
          "fixed inset-0 h-screen w-screen border-0 select-none",
          "[mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]",
        )}
        squaresClassName="hover:fill-gray-400/40"
        width={60}
        height={42}
        squares={[26, 26]}
      />

      {/* Content */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Get Started</h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Sign in to your account or create a new one.</p>
        </div>

        {/* Toggle */}
        <div className="mb-6 inline-flex rounded-lg border border-gray-400/40 bg-white/60 p-1 text-sm backdrop-blur-sm dark:bg-black/30">
          <button
            onClick={() => setMode("signin")}
            className={cn(
              "rounded-md px-4 py-2 transition",
              mode === "signin" ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-black/5 dark:hover:bg-white/10",
            )}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={cn(
              "rounded-md px-4 py-2 transition",
              mode === "signup" ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-black/5 dark:hover:bg-white/10",
            )}
          >
            Sign Up
          </button>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-1">
          {/* Sign In */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: wire to backend
              alert("Signed in (demo)");
            }}
            className={cn(
              "rounded-xl border border-gray-400/40 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:bg-black/30",
              mode === "signup" && "opacity-60",
            )}
          >
            <h2 className="mb-4 text-lg font-medium">Sign In</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm">Email</label>
                <input type="email" required className="w-full rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:bg-black/40 dark:text-white" />
              </div>
              <div>
                <label className="mb-1 block text-sm">Password</label>
                <input type="password" required className="w-full rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:bg-black/40 dark:text-white" />
              </div>
              <button type="submit" className="mt-2 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                Continue
              </button>
            </div>
          </form>

          {/* Sign Up */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: wire to backend
              alert("Account created (demo)");
            }}
            className={cn(
              "rounded-xl border border-gray-400/40 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:bg-black/30",
              mode === "signin" && "opacity-60",
            )}
          >
            <h2 className="mb-4 text-lg font-medium">Sign Up</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm">Full name</label>
                <input type="text" required className="w-full rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:bg-black/40 dark:text-white" />
              </div>
              <div>
                <label className="mb-1 block text-sm">Email</label>
                <input type="email" required className="w-full rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:bg-black/40 dark:text-white" />
              </div>
              <div>
                <label className="mb-1 block text-sm">Password</label>
                <input type="password" required minLength={6} className="w-full rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:bg-black/40 dark:text-white" />
              </div>
              <button type="submit" className="mt-2 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                Create Account
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <a href="/" className="underline-offset-2 hover:underline">Back Home</a>
        </div>
      </section>
    </main>
  );
}
