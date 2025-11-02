/* eslint-disable */
// @ts-nocheck
import { Link } from "react-router-dom";
import { Home, LayoutDashboard, Calendar, Check } from "lucide-react";
import curalynxGif from "../assets/curalynx.gif";

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={curalynxGif} alt="Curalynx" className="h-10 w-25 rounded-lg" />
             
            </Link>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/todays-session "
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                <Calendar className="h-4 w-4" />
                Appointments
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Curalynx</h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Curalynx was built to give doctors their time back.
            Every year, thousands of hours are lost to typing, clicking, and documenting patient visits. 
            Curalynx changes that by turning conversations into clinical notes—automatically and securely.
          </p>
        </div>
      </section>

     

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">It Listens</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Curalynx passively listens during consultations. No setup, no "start recording" button—just natural conversation. 
                    All audio is processed locally or through encrypted channels for privacy.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">It Understands</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Using Whisper for speech-to-text and a custom-tuned language model, Curalynx identifies key details—symptoms, vitals, medications, and diagnoses. 
                    It recognizes who's speaking and structures the data accordingly.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">It Writes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Within seconds, it drafts a SOAP note (Subjective, Objective, Assessment, Plan) that's accurate, well-formatted, and ready for review.
                    The doctor makes quick edits, clicks approve, and moves on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why It Matters</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Check className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Less Burnout</h3>
              </div>
              <p className="text-gray-700">Every 15 minutes saved per patient adds up.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Check className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Better Accuracy</h3>
              </div>
              <p className="text-gray-700">Real-time transcription reduces missed details.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Check className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">More Face-Time</h3>
              </div>
              <p className="text-gray-700">Doctors can focus on listening, not typing.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Check className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Consistent Notes</h3>
              </div>
              <p className="text-gray-700">Structured, standardized documentation for every visit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Security Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Privacy & Security</h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">We take security seriously.</p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>All recordings are encrypted in transit and at rest.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>No data is shared with third parties.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Models can run on-premise or within secure healthcare environments.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>You stay in control of what's recorded, stored, or deleted.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Who It's For</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clinics</h3>
              <p className="text-gray-700">Looking to reduce admin load</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Independent Practitioners</h3>
              <p className="text-gray-700">Without a scribe</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hospitals</h3>
              <p className="text-gray-700">Adopting digital transformation</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Telehealth Platforms</h3>
              <p className="text-gray-700">Integrating smarter documentation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">The Vision</h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-4">
            Curalynx isn't just a transcription tool—it's the start of a smarter clinical workflow.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Imagine an assistant that can summarize follow-ups, auto-generate prescriptions, and even spot inconsistencies in treatment plans. 
            That's where we're headed.
          </p>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Us</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be among the first to experience Curalynx.
            Sign up for early access or reach out if you'd like to collaborate.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/get-started"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
            >
              Join Waitlist
            </Link>
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition border border-blue-500"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Curalynx by Team BODMAS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
