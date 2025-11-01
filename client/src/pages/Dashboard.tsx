import { useMemo, useState } from "react";
// Removed unused imports (Sidebar, Navbar - assuming they are separate files)
import DashboardStats from "@/components/dashboard/DashboardStats";
import PatientCard from "@/components/dashboard/PatientCard";
import Navbar from "@/components/dashboard/Navbar"; // Keep Navbar for context
import type { AppointmentType, Patient } from "@/types";

const initialPatients: Patient[] = [
  // Added more patients for a longer list
  { id: "p1", name: "Rahul Verma", age: 42, reason: "Chest pain", appointmentType: "Consultation", status: "waiting", time: new Date().toISOString() },
  { id: "p2", name: "Neha Gupta", age: 29, reason: "Regular checkup", appointmentType: "Checkup", status: "waiting", time: new Date().toISOString() },
  { id: "p3", name: "Amit Singh", age: 64, reason: "Follow-up ECG", appointmentType: "Follow-up", status: "in-session", time: new Date().toISOString() },
  { id: "p4", name: "Priya Menon", age: 55, reason: "High blood pressure", appointmentType: "Consultation", status: "waiting", time: new Date().toISOString() },
  { id: "p5", name: "Suresh K.", age: 31, reason: "Annual physical", appointmentType: "Checkup", status: "waiting", time: new Date().toISOString() },
  { id: "p6", name: "Deepa Rathi", age: 78, reason: "Post-op check", appointmentType: "Follow-up", status: "done", time: new Date().toISOString() },
  { id: "p7", name: "Vikas Jain", age: 19, reason: "Fever and cough", appointmentType: "Emergency", status: "waiting", time: new Date().toISOString() },
  { id: "p8", name: "Anjali Shah", age: 49, reason: "Diabetic review", appointmentType: "Consultation", status: "waiting", time: new Date().toISOString() },
  { id: "p9", name: "Rajesh T.", age: 60, reason: "Knee pain follow-up", appointmentType: "Follow-up", status: "in-session", time: new Date().toISOString() },
];

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [search, setSearch] = useState("");
  const [age, setAge] = useState<string>("");
  const [type, setType] = useState<AppointmentType | "">("");

  const activeSessions = useMemo(() => patients.filter((p) => p.status === "in-session").length, [patients]);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const byName = !search || p.name.toLowerCase().includes(search.toLowerCase());
      const byAge = !age || String(p.age) === age.trim();
      const byType = !type || p.appointmentType === type;
      return byName && byAge && byType;
    });
  }, [patients, search, age, type]);

  function startAnySession() {
    const idx = patients.findIndex((p) => p.status === "waiting");
    if (idx === -1) return;
    const next = [...patients];
    next[idx] = { ...next[idx], status: "in-session" };
    setPatients(next);
  }

  function addPatient(form: { name: string; age: number; reason: string; appointmentType: AppointmentType }) {
    const np: Patient = {
      id: Math.random().toString(36).slice(2),
      name: form.name,
      age: form.age,
      reason: form.reason,
      appointmentType: form.appointmentType,
      status: "waiting",
      time: new Date().toISOString(),
    };
    setPatients((prev) => [np, ...prev]);
  }

  function onStart(id: string) {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, status: "in-session" } : p)));
  }
  function onDone(id: string) {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, status: "done" } : p)));
  }

  return (
    <main className="relative min-h-screen bg-white text-black">
      <Navbar doctorName="Dr. A. Sharma" />

      {/* Wrapping content in a grid structure to allow for content to be right of a possible sidebar in the original design */}
      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 md:grid-cols-[260px,1fr]">
        {/* Keeping a placeholder for Sidebar based on original structure, but with empty content */}
        <div className="hidden md:block">
           {/* If you re-introduce Sidebar, replace this */}
        </div> 

        <section className="flex flex-col gap-4 p-4">
          {/* Header and actions */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center pt-72 pb-2">
            <h1 className="text-2xl font-semibold">Doctor Dashboard</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={startAnySession}
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Start Session
              </button>
              <AddPatient onAdd={addPatient} />
            </div>
          </div>

          {/* Stats */}
          <div className="mb-4">
            <DashboardStats totalPatients={patients.length} activeSessions={activeSessions} avgConsultationMins={18} />
          </div>

          {/* Filters */}
          <div className="rounded-md border border-gray-200 bg-white/70 p-3 mb-4 backdrop-blur-sm dark:border-gray-700/50 dark:bg-black/30">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name"
                className="rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:bg-black/40 dark:text-white"
              />
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className="rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:bg-black/40 dark:text-white"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value as AppointmentType | "")}
                className="rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:bg-black/40 dark:text-white"
              >
                <option value="">All types</option>
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Emergency">Emergency</option>
                <option value="Checkup">Checkup</option>
              </select>
              <button
                onClick={() => {
                  setSearch("");
                  setAge("");
                  setType("");
                }}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-black/30 dark:text-white dark:hover:bg-black/50"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Queue - The key change is here */}
          <div className="grid **grid-cols-1** gap-3"> {/* Changed from sm:grid-cols-3 lg:grid-cols-4 */}
            {filtered.map((p) => (
              <PatientCard key={p.id} patient={p} onStart={onStart} onDone={onDone} />
            ))}
            {filtered.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-600">
                No patients match your filters.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

// AddPatient component remains unchanged
function AddPatient({ onAdd }: { onAdd: (p: { name: string; age: number; reason: string; appointmentType: AppointmentType; }) => void; }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentType, setAppointmentType] = useState<AppointmentType>("Consultation");

  function submit() {
    if (!name || !age || !reason) return;
    onAdd({ name, age: Number(age), reason, appointmentType });
    setOpen(false);
    setName(""); setAge(""); setReason(""); setAppointmentType("Consultation");
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:bg-black/30 dark:text-white dark:hover:bg-black/50">Add Patient</button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-gray-200 bg-white/80 p-2 dark:border-gray-700/50 dark:bg-black/30">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-36 rounded-md border border-gray-300 bg-white/90 px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:bg-black/40 dark:text-white" />
      <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="w-20 rounded-md border border-gray-300 bg-white/90 px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:bg-black/40 dark:text-white" />
      <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason" className="w-40 rounded-md border border-gray-300 bg-white/90 px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:bg-black/40 dark:text-white" />
      <select value={appointmentType} onChange={(e) => setAppointmentType(e.target.value as AppointmentType)} className="rounded-md border border-gray-300 bg-white/90 px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:bg-black/40 dark:text-white">
        <option value="Consultation">Consultation</option>
        <option value="Follow-up">Follow-up</option>
        <option value="Emergency">Emergency</option>
        <option value="Checkup">Checkup</option>
      </select>
      <button onClick={submit} className="rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">Add</button>
      <button onClick={() => setOpen(false)} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-black/30 dark:text-white dark:hover:bg-black/50">Cancel</button>
    </div>
  );
}
