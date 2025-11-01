import ProfileCard from "./ProfileCard";
import { Link } from "react-router-dom";

export default function Sidebar({
  onLogout,
}: {
  onLogout: () => void;
}) {
  return (
    <aside className="sticky top-0 flex h-screen w-full max-w-xs flex-col gap-4 border-r border-gray-200 bg-white/60 p-4 backdrop-blur-sm dark:border-gray-700/50 dark:bg-black/20">
      <ProfileCard name="Dr. A. Sharma" specialization="Cardiologist" upcoming={3} onLogout={onLogout} />

      <nav className="mt-2 space-y-1 text-sm">
        <Link to="/dashboard" className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">Dashboard</Link>
        <Link to="/get-started" className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">Get Started</Link>
        <Link to="/learn-more" className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">Learn More</Link>
      </nav>

      <div className="mt-auto text-center text-[10px] text-gray-500">© {new Date().getFullYear()} Clinic</div>
    </aside>
  );
}
