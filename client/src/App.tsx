import { InteractiveGridPattern } from "./components/ui/interactive-grid-pattern";
import { cn } from "./lib/utils";
import "./App.css";

export default function App() {
  return (
    <main className="relative min-h-screen overflow">
      {/* Background grid */}
      <InteractiveGridPattern
        className={cn(
          // make sure it covers the entire viewport regardless of content
          "fixed inset-0 h-screen w-screen border-0 select-none",
          // subtle mask to fade at edges
          "[mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]",
        )}
        squaresClassName="hover:fill-gray-400/40"
        width={60}
        height={42}
        squares={[26, 26]}
      />

      {/* Content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-400/40 bg-white/60 px-3 py-1 text-xs backdrop-blur-sm dark:bg-black/30">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Doctor is now LIVE
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            Get quick patient checkups using CuralynX
          </h1>
          <p className="mt-4 text-pretty text-base text-gray-600 sm:mt-6 sm:text-lg dark:text-gray-300">
            Curalynx listens, understands, and writes patient notes automatically—so doctors can focus on medicine, not paperwork.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="/get-started"
              className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Get Started
            </a>
            <a
              href="/learn-more"
              className="rounded-md border border-gray-400/40 bg-white/60 px-5 py-2.5 text-sm font-medium text-gray-900 backdrop-blur-sm transition hover:bg-white/80 dark:bg-black/30 dark:text-white dark:hover:bg-black/50"
            >
              Learn More
            </a>
          </div>
        </div>
        <footer className="absolute inset-x-0 bottom-4 z-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Team BODMAS
        </footer>
      </section>
    </main>
  );
}
