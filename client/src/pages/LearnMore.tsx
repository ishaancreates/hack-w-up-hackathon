import { InteractiveGridPattern } from "../components/ui/interactive-grid-pattern";
import { cn } from "../mainutils";

export default function LearnMore() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background grid */}
      <InteractiveGridPattern
        className={cn(
          "fixed inset-0 h-screen w-screen border-0 select-none",
          "[mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]",
        )}
        squaresClassName="hover:fill-gray-400/40"
        width={42}
        height={42}
        squares={[26, 26]}
      />

      {/* Content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            Learn More
          </h1>
          <p className="mt-4 text-pretty text-base text-gray-600 sm:mt-6 sm:text-lg dark:text-gray-300">
            This page shows how you can use a lightweight hash router to navigate without extra
            dependencies. The interactive grid stays in the background across pages.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/"
              className="rounded-md border border-gray-400/40 bg-white/60 px-5 py-2.5 text-sm font-medium text-gray-900 backdrop-blur-sm transition hover:bg-white/80 dark:bg-black/30 dark:text-white dark:hover:bg-black/50"
            >
              Back Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
