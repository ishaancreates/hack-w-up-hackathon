import { cn } from "@/lib/utils";
import type { Patient, PatientStatus } from "@/types";

export default function PatientCard({
  patient,
  onStart,
  onDone,
}: {
  patient: Patient;
  onStart: (id: string) => void;
  onDone: (id: string) => void;
}) {
  const statusColor: Record<PatientStatus, string> = {
    "waiting": "bg-amber-100 text-amber-700 border-amber-200",
    "in-session": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "done": "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:border-gray-700/50 dark:bg-black/30">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold">{patient.name} <span className="text-gray-500 text-xs">• {patient.age}</span></h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{patient.reason}</p>
          <p className="mt-1 text-xs text-gray-500">{patient.appointmentType} • {new Date(patient.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-medium", statusColor[patient.status])}>
          {patient.status}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {patient.status === "waiting" && (
          <button
            onClick={() => onStart(patient.id)}
            className="rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Start Session
          </button>
        )}
        {patient.status === "in-session" && (
          <button
            onClick={() => onDone(patient.id)}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-50 dark:border-gray-600 dark:bg-black/30 dark:text-white dark:hover:bg-black/50"
          >
            Mark Done
          </button>
        )}
      </div>
    </div>
  );
}
