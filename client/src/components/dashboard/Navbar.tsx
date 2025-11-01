import { useEffect, useRef, useState } from "react";
import logo from "../../assets/curalynx.gif";

export default function Navbar({
  doctorName = "Dr. A. Sharma",
  avatarUrl,
}: {
  doctorName?: string;
  avatarUrl?: string;
}) {
  // Hidden by default; appears only when user scrolls up
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastY.current;
      const threshold = 6;
      if (delta > threshold) {
        // scrolling down -> show
        setVisible(true);
      } else if (delta < -threshold) {
        // scrolling up -> hide
        setVisible(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = doctorName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ease-out transform-gpu ${
        visible ? "opacity-100 translate-y-0" : "-translate-y-8 opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mt-3 flex items-center justify-between rounded-xl border border-gray-200/70 bg-white/60 px-3 py-2 backdrop-blur-md dark:border-gray-700/50 dark:bg-black/30">
          {/* Left: company logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="CuralynX" className="h-8 w-auto rounded" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">CuralynX</span>
          </div>

          {/* Right: doctor profile */}
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <img src={avatarUrl} alt={doctorName} className="h-9 w-9 rounded-full object-cover" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-white">
                {initials}
              </div>
            )}
            <span className="text-sm font-medium">{doctorName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
