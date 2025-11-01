import { useState } from 'react'

// Mock data matching reference images
const mockData = {
  patient: {
    name: 'Alex',
    role: 'Patient Portal • Aura Health',
  },
  stats: [
    { label: 'Next Appointment', value: 'Apr 28 · 10:30 AM', detail: 'Cardiology Follow-up' },
    { label: 'Recent BP', value: '118 / 76', detail: '3 days ago' },
    { label: 'Medications', value: '5 Active', detail: '2 due today' },
    { label: 'Unread Messages', value: '3', detail: 'From Care Team' },
  ],
  careTeam: [
    { name: 'Dr. Maya Chen', role: 'Primary Care', phone: '(555) 214-8890' },
    { name: 'Dr. Luis Ortega', role: 'Cardiology', phone: '(555) 122-4411' },
    { name: 'Nurse Kelly Brooks', role: 'Care Nurse', phone: 'Portal Message' },
  ],
  vitals: [
    { label: 'Blood Pressure', value: '118/76', date: 'Oct 26' },
    { label: 'Heart Rate', value: '68 bpm', date: 'Oct 26' },
    { label: 'Weight', value: '72.4 kg', date: 'Oct 20' },
  ],
  appointments: [
    { date: 'Nov 2, 9:30 AM', doctor: 'Dr. Maya Chen', type: 'Clinic visit', time: 'In 1 day' },
    { date: 'Nov 15, 2:00 PM', doctor: 'Dr. Luis Ortega', type: 'Cardio Follow-up', time: 'In 2 weeks' },
  ],
  medications: [
    { name: 'Lisinopril 10mg', frequency: '1 tablet daily', refills: '2 refills left', status: 'Active' },
    { name: 'Atorvastatin 20mg', frequency: '1 tablet at night', refills: '0 refills', status: 'Request Refill' },
  ],
  notifications: [
    { type: 'Lab results available: Lipid Panel', action: 'View' },
    { type: 'Appointment tomorrow with Dr. Chen', action: '9:30 AM' },
    { type: 'New secure message from Nurse Brooks', action: 'Open' },
  ],
  visitHistory: [
    { title: 'Annual Physical', date: 'Feb 12, 2025', detail: 'Vitals stable, labs ordered' },
    { title: 'Telehealth • Cardiology', date: 'Dec 03, 2024', detail: 'Medication adjusted' },
    { title: 'ER Visit', date: 'Sep 21, 2024', detail: 'Discharged same day' },
  ],
  reports: [
    { name: 'Lipid Panel', detail: 'Collected Jul 28 • HDL 55, LDL 98' },
    { name: 'Chest X-ray', detail: 'Imaging • Aug 04 • Normal' },
    { name: 'A1C', detail: 'Collected Jul 28 • 5.5%' },
  ],
  allAppointments: [
    { id: 1, date: 'Nov 2, 9:30 AM', doctor: 'Dr. Maya Chen', type: 'Clinic visit', status: 'Upcoming', time: 'In 1 day' },
    { id: 2, date: 'Nov 15, 2:00 PM', doctor: 'Dr. Luis Ortega', type: 'Cardio Follow-up', status: 'Upcoming', time: 'In 2 weeks' },
    { id: 3, date: 'Oct 28, 10:00 AM', doctor: 'Dr. Maya Chen', type: 'Follow-up', status: 'Completed', time: '4 days ago' },
  ],
  allMedications: [
    { id: 1, name: 'Lisinopril 10mg', frequency: '1 tablet daily', refills: '2 refills left', status: 'Active', prescribedBy: 'Dr. Maya Chen' },
    { id: 2, name: 'Atorvastatin 20mg', frequency: '1 tablet at night', refills: '0 refills', status: 'Request Refill', prescribedBy: 'Dr. Luis Ortega' },
    { id: 3, name: 'Metformin 500mg', frequency: 'Twice daily', refills: '1 refill left', status: 'Active', prescribedBy: 'Dr. Maya Chen' },
  ],
  allReports: [
    { id: 1, name: 'Lipid Panel', date: 'Feb 12, 2025', type: 'Lab', status: 'Normal', detail: 'HDL 55, LDL 98' },
    { id: 2, name: 'Chest X-ray', date: 'Aug 04, 2024', type: 'Imaging', status: 'Normal', detail: 'No findings' },
    { id: 3, name: 'A1C', date: 'Jul 28, 2024', type: 'Lab', status: 'Normal', detail: '5.5%' },
    { id: 4, name: 'CBC Panel', date: 'Jul 12, 2024', type: 'Lab', status: 'Normal', detail: 'All values normal' },
    { id: 5, name: 'Metabolic Panel', date: 'Jun 05, 2024', type: 'Lab', status: 'Normal', detail: 'Glucose 95' },
  ],
  vitalsSeries: [
    { date: 'Oct 26', bp: '118/76', hr: '68', weight: '72.4' },
    { date: 'Oct 19', bp: '120/78', hr: '70', weight: '72.6' },
    { date: 'Oct 12', bp: '116/74', hr: '66', weight: '72.2' },
    { date: 'Oct 5', bp: '119/77', hr: '69', weight: '72.8' },
  ],
  availableDoctors: [
    {
      id: 1,
      name: 'Dr. Arvinder Singh Soin',
      title: 'Chairman',
      department: 'Liver Transplant',
      specialities: ['Hepatocellular Carcinoma', 'Liver Transplant', 'Liver Surgeries', 'Choledochal Cyst', 'Portal Hypertension'],
      locations: ['Lucknow', 'Gurugram'],
      photo: 'https://medanta.s3.ap-south-1.amazonaws.com/all-doctor-with-slug/dr-arvinder-singh-soin.png?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Dr. Aakash Pandita',
      title: 'Director',
      department: 'Paediatric Care',
      specialities: ['Infectious Diseases', 'Jaundice & complex neonatal cases', 'PPHN & Perinatal dialysis', 'Child vaccination'],
      locations: ['Lucknow'],
      photo: 'https://medanta.s3.ap-south-1.amazonaws.com/all-doctor-with-slug/dr-aakash-pandita.png?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Dr. Abhai Verma',
      title: 'Director',
      department: 'Gastrosciences',
      specialities: ['Inflammatory Bowel Disease', 'GI Physiology', 'Therapeutic Endoscopy', 'Functional Bowel Diseases'],
      locations: ['Lucknow'],
      photo: 'https://medanta.s3.ap-south-1.amazonaws.com/all-doctor-with-slug/dr-abhai-verma.png?w=200&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Dr. Amit Agarwal',
      title: 'Senior Consultant',
      department: 'Primary Care',
      specialities: ['General Medicine', 'Preventive Care', 'Chronic Disease Management', 'Patient Education'],
      locations: ['Lucknow', 'Gurugram'],
      photo: 'https://medanta.s3.ap-south-1.amazonaws.com/all-doctor-with-slug/dr-amit-agarwal.png?w=200&h=200&fit=crop'
    },
    {
      id: 5,
      name: 'Dr. Luis Ortega',
      title: 'Consultant',
      department: 'Cardiology',
      specialities: ['Heart Disease', 'Hypertension', 'Arrhythmia Management', 'Cardiac Imaging'],
      locations: ['Lucknow'],
      photo: 'https://images.unsplash.com/photo-1612349317150-e88e6ff1fcc4?w=200&h=200&fit=crop'
    },
  ],
}

export function PatientDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showRefillModal, setShowRefillModal] = useState(false)
  const [showReportDetail, setShowReportDetail] = useState<any>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [readNotifications, setReadNotifications] = useState(new Set())

  const tabs = [
    { id: 'dashboard', label: 'Dashboard Home', icon: '🏥' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'medications', label: 'Medications', icon: '💊' },
    { id: 'vitals', label: 'Vitals', icon: '❤️' },
    { id: 'reports', label: 'My Reports', icon: '📋' },
    { id: 'doctors', label: 'Doctors', icon: '👨‍⚕️' },
  ]

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* LEFT SIDEBAR - Fixed width */}
      <div className="w-80 bg-gradient-to-b from-blue-50 to-emerald-50 border-r border-gray-200 overflow-y-auto flex-shrink-0">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              HC
            </div>
            <div>
              <h1 className="font-bold text-sm text-gray-900">CuraLynX</h1>
              <p className="text-xs text-gray-600">Portal</p>
            </div>
          </div>

          {/* My Care Team */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-sm text-gray-900">My Care Team</h2>
              <a href="#" className="text-xs text-blue-600 font-semibold">View All</a>
            </div>
            <div className="space-y-2">
              {mockData.careTeam.map((member, idx) => (
                <div key={idx} className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 text-xs flex items-center justify-center font-bold text-gray-600">
                    👤
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-xs text-gray-900 truncate">{member.name}</p>
                    <p className="text-xs text-gray-600 truncate">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Vitals */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-sm text-gray-900">My Vitals</h2>
              <a href="#" className="text-xs text-blue-600 font-semibold">Add</a>
            </div>
            <div className="space-y-2">
              {mockData.vitals.map((vital, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded text-xs">
                  <div>
                    <p className="font-semibold text-gray-900">{vital.label}</p>
                    <p className="text-gray-600">{vital.value}</p>
                  </div>
                  <p className="text-gray-500">{vital.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h2 className="font-bold text-sm text-gray-900 mb-3">Book an Appointment</h2>
            <p className="text-xs text-gray-600 mb-3">Meet our specialised doctors</p>
            <div className="space-y-2">
              {mockData.availableDoctors.slice(0, 3).map((doctor) => (
                <div key={doctor.id} className="p-3 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex gap-2">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-blue-500"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-xs text-gray-900 truncate">{doctor.name}</p>
                      <p className="text-xs text-blue-600">{doctor.department}</p>
                      <p className="text-xs text-gray-500 truncate">{doctor.title}</p>
                    </div>
                  </div>
                  <button className="w-full mt-2 px-2 py-1.5 bg-orange-500 text-white rounded-lg font-semibold text-xs hover:bg-orange-600 transition-colors">
                    Meet the Doctor
                  </button>
                </div>
              ))}
              <button
                onClick={() => setActiveTab('doctors')}
                className="w-full mt-3 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold text-xs hover:bg-gray-50"
              >
                View All Doctors
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP HEADER */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 flex-shrink-0">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {mockData.patient.name}</h1>
              <p className="text-gray-600 text-xs mt-1">{mockData.patient.role}</p>
            </div>
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
                {mockData.notifications.length - readNotifications.size > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {mockData.notifications.length - readNotifications.size}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {mockData.notifications.length > 0 ? (
                      mockData.notifications.map((notif, idx) => (
                        <div
                          key={idx}
                          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            readNotifications.has(idx) ? 'bg-gray-50' : 'bg-blue-50'
                          }`}
                          onClick={() => {
                            setReadNotifications(new Set([...readNotifications, idx]))
                          }}
                        >
                          <p className={`text-sm ${readNotifications.has(idx) ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>
                            {notif.type}
                          </p>
                          <button className={`text-xs font-semibold hover:underline mt-2 ${
                            readNotifications.has(idx) ? 'text-gray-500' : 'text-blue-600'
                          }`}>
                            {notif.action} →
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-4 gap-2">
            {mockData.stats.map((stat, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">{stat.label}</p>
                <p className="text-base font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-600 mt-0.5">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white border-b border-gray-200 px-4 flex-shrink-0 overflow-x-auto">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-12 gap-4">
              {/* LEFT COLUMN - 2/3 width */}
              <div className="col-span-8 space-y-3">
                {/* Upcoming Appointments */}
                <div className="bg-white rounded-lg border border-gray-200 p-3.5">
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📅</span>
                      <h2 className="text-sm font-bold text-gray-900">Upcoming Appointments</h2>
                    </div>
                    <button
                      onClick={() => setShowScheduleModal(true)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold text-xs hover:bg-blue-700 transition-colors"
                    >
                      Schedule
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {mockData.appointments.map((apt, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={() => alert(`View appointment details: ${apt.doctor}`)}
                      >
                        <p className="text-xs font-bold text-gray-900">{apt.date}</p>
                        <p className="text-xs text-blue-700 font-semibold mt-0.5">{apt.doctor}</p>
                        <div className="flex justify-between items-center mt-1 text-xs">
                          <span className="text-gray-600">{apt.type}</span>
                          <span className="text-gray-500">{apt.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* My Medications */}
                <div className="bg-white rounded-lg border border-gray-200 p-3.5">
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💊</span>
                      <h2 className="text-sm font-bold text-gray-900">My Medications</h2>
                    </div>
                    <button
                      onClick={() => setShowRefillModal(true)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold text-xs hover:bg-blue-700 transition-colors"
                    >
                      Refill
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {mockData.medications.map((med, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors"
                        onClick={() => alert(`Medication: ${med.name}\nFrequency: ${med.frequency}\nStatus: ${med.status}`)}
                      >
                        <p className="text-xs font-bold text-gray-900">{med.name}</p>
                        <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                          <div>
                            <p className="text-gray-600">{med.frequency}</p>
                            <p className="text-gray-500">{med.refills}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold inline-block ${
                              med.status === 'Active' ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
                            }`}>
                              {med.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aura Companion */}
                <div className="bg-white rounded-lg border border-gray-200 p-3.5 min-h-48">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🤖</span>
                      <h2 className="text-sm font-bold text-gray-900">Cura Companion</h2>
                    </div>
                    <button className="text-xs text-blue-600 font-semibold hover:underline">New</button>
                  </div>
                  <div className="flex-1 mb-2 p-2 bg-gray-50 rounded-lg min-h-32 flex items-center justify-center">
                    <p className="text-xs text-gray-700">Ask about your care plan</p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder=  "Ask Cura..."
                      className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                    />
                    <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold text-xs hover:bg-emerald-700">Send</button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - 1/3 width */}
              <div className="col-span-4 space-y-3">
                {/* Visit History */}
                <div className="bg-white rounded-lg border border-gray-200 p-3.5">
                  <div className="flex justify-between items-center mb-2.5">
                    <h2 className="text-sm font-bold text-gray-900">Visit History</h2>
                    <a href="#" className="text-xs text-blue-600 font-semibold hover:underline">View All</a>
                  </div>
                  <div className="space-y-1.5">
                    {mockData.visitHistory.map((visit, idx) => (
                      <div key={idx} className="flex gap-2 pb-1.5 border-b border-gray-100 last:border-b-0">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900">{visit.title}</p>
                          <p className="text-xs text-gray-600">{visit.date}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{visit.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Vitals */}
                <div className="bg-white rounded-lg border border-gray-200 p-3.5">
                  <h2 className="text-sm font-bold text-gray-900 mb-2.5">Recent Vitals</h2>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-xs text-gray-600 font-semibold">Heart Rate</p>
                      <p className="text-lg font-bold text-blue-700 mt-0.5">72 bpm</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <p className="text-xs text-gray-600 font-semibold">Weight</p>
                      <p className="text-lg font-bold text-emerald-700 mt-0.5">68.4 kg</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200">
                      <p className="text-xs text-gray-600 font-semibold">SpO₂</p>
                      <p className="text-lg font-bold text-purple-700 mt-0.5">98%</p>
                    </div>
                  </div>
                </div>

                {/* My Reports */}
                <div className="bg-white rounded-lg border border-gray-200 p-3.5">
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">📋</span>
                      <h2 className="text-sm font-bold text-gray-900">My Reports</h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('reports')}
                      className="text-xs text-emerald-600 font-semibold hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {mockData.reports.slice(0, 3).map((report, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => setShowReportDetail(report)}
                      >
                        <p className="text-xs font-bold text-gray-900">{report.name}</p>
                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{report.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">All Appointments</h2>
              {mockData.allAppointments.map((apt) => (
                <div key={apt.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{apt.doctor}</p>
                      <p className="text-xs text-gray-600 mt-1">{apt.type}</p>
                      <p className="text-xs text-gray-500 mt-1">{apt.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      apt.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700">
                    {apt.status === 'Upcoming' ? 'Reschedule' : 'View Details'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">All Medications</h2>
              {mockData.allMedications.map((med) => (
                <div key={med.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{med.name}</p>
                      <p className="text-xs text-gray-600 mt-1">Prescribed by: {med.prescribedBy}</p>
                      <p className="text-xs text-gray-600">Frequency: {med.frequency}</p>
                      <p className="text-xs text-gray-500 mt-2">{med.refills}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      med.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {med.status}
                    </span>
                  </div>
                  {med.status === 'Request Refill' && (
                    <button className="mt-3 px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700">
                      Request Refill
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">My Vitals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <p className="text-sm font-bold text-gray-900 mb-4">Blood Pressure</p>
                  <div className="space-y-2">
                    {mockData.vitalsSeries.map((vital, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 rounded bg-blue-50">
                        <span className="text-xs text-gray-600">{vital.date}</span>
                        <span className="text-sm font-bold text-blue-700">{vital.bp}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <p className="text-sm font-bold text-gray-900 mb-4">Heart Rate</p>
                  <div className="space-y-2">
                    {mockData.vitalsSeries.map((vital, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 rounded bg-emerald-50">
                        <span className="text-xs text-gray-600">{vital.date}</span>
                        <span className="text-sm font-bold text-emerald-700">{vital.hr} bpm</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">All Reports</h2>
              <div className="grid grid-cols-1 gap-3">
                {mockData.allReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setShowReportDetail(report)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{report.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{report.type} • {report.date}</p>
                        <p className="text-xs text-gray-500 mt-1">{report.detail}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                        report.status === 'Normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700">
                        Open
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'doctors' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Our Specialised Doctors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.availableDoctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex gap-4 mb-4">
                      <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-orange-500 font-semibold">{doctor.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{doctor.department}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {doctor.specialities.slice(0, 3).map((spec, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded flex items-center gap-1">
                            ✓ {spec}
                          </span>
                        ))}
                      </div>
                      {doctor.specialities.length > 3 && (
                        <p className="text-xs text-gray-500">+{doctor.specialities.length - 3} more specialities</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-900 mb-2">📍 Locations:</p>
                      <div className="flex flex-wrap gap-2">
                        {doctor.locations.map((loc, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setShowScheduleModal(true)}
                      className="w-full px-4 py-2.5 bg-orange-500 text-white rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors"
                    >
                      Meet the Doctor
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'appointments' && activeTab !== 'medications' && activeTab !== 'vitals' && activeTab !== 'reports' && activeTab !== 'doctors' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-base font-semibold text-gray-900">
                {tabs.find(t => t.id === activeTab)?.label} content
              </p>
            </div>
          )}

          {/* Report Detail Modal */}
          {showReportDetail && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{showReportDetail.name}</h3>
                  <button
                    onClick={() => setShowReportDetail(null)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-gray-600"><strong>Type:</strong> {showReportDetail.type}</p>
                  <p className="text-sm text-gray-600"><strong>Date:</strong> {showReportDetail.date}</p>
                  <p className="text-sm text-gray-600"><strong>Status:</strong> {showReportDetail.status}</p>
                  <p className="text-sm text-gray-600"><strong>Details:</strong> {showReportDetail.detail}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700">
                    Open Report
                  </button>
                  <button
                    onClick={() => setShowReportDetail(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Appointment Modal */}
          {showScheduleModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Schedule Appointment</h3>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Select Doctor</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                      <option>Dr. Maya Chen - Primary Care</option>
                      <option>Dr. Luis Ortega - Cardiology</option>
                      <option>Nurse Kelly Brooks - Care Nurse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Preferred Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Appointment Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                      <option>Clinic Visit</option>
                      <option>Telehealth</option>
                      <option>Follow-up</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                    Schedule
                  </button>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Refill Modal */}
          {showRefillModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Request Medication Refill</h3>
                  <button
                    onClick={() => setShowRefillModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Select Medication</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                      <option>Lisinopril 10mg - 2 refills left</option>
                      <option>Atorvastatin 20mg - 0 refills left</option>
                      <option>Metformin 500mg - 1 refill left</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
                    <input type="number" placeholder="30 days supply" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                    Request Refill
                  </button>
                  <button
                    onClick={() => setShowRefillModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


