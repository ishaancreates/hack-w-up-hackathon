/* eslint-disable */
// @ts-nocheck
import { useState, useEffect } from 'react';
import { useWebSpeechRecognition } from '../../hooks';
import { useSession } from '../../contexts/SessionContext';

const initialPatients = [
    { id: 1, name: 'Priya Sharma', time: '10:00 AM', status: 'active', age: 38, pastDiseases: 'Allergic Rhinitis', weight: '68 kg', bp: '118/75', sugarLevel: '92 mg/dL' },
    { id: 2, name: 'Rajesh Kumar', time: '10:30 AM', status: 'waiting', age: 55, pastDiseases: 'Type 2 Diabetes', weight: '95 kg', bp: '135/88', sugarLevel: '140 mg/dL' },
    { id: 3, name: 'Anita Patel', time: '11:00 AM', status: 'waiting', age: 29, pastDiseases: 'None', weight: '58 kg', bp: '110/70', sugarLevel: '85 mg/dL' },
    { id: 4, name: 'Suresh Gupta', time: '11:30 AM', status: 'waiting', age: 67, pastDiseases: 'Coronary Artery Disease', weight: '82 kg', bp: '145/92', sugarLevel: '105 mg/dL' },
    { id: 5, name: 'Meera Singh', time: '12:00 PM', status: 'waiting', age: 42, pastDiseases: 'Migraines', weight: '75 kg', bp: '125/80', sugarLevel: '98 mg/dL' },
];

// AssemblyAI-based transcription (see hook usage below)

const Sidebar = () => {
    const [patients] = useState(initialPatients);
    const [isHovered, setIsHovered] = useState(false);
    const activePatient = patients.find(p => p.status === 'active');
    const [transcript, setTranscript] = useState<{ speaker: string; text: string }[]>([]);
    const { addTranscript, setActivePatient } = useSession();
    // Use English recognition
    const { interim, finals, isListening, error, start, stop } = useWebSpeechRecognition('en-US');

    // Set active patient in context
    useEffect(() => {
        if (activePatient) {
            setActivePatient(activePatient);
        }
    }, [activePatient, setActivePatient]);

    // Reset transcript when active patient changes
    useEffect(() => {
        setTranscript([]);
    }, [activePatient]);

    // Reflect finals from hook into chat bubbles
    useEffect(() => {
        if (!finals || finals.length === 0) return;
        const last = finals[finals.length - 1];
        if (last?.text?.trim()) {
            setTranscript(prev => {
                const lastSpeaker = prev.length > 0 ? prev[prev.length - 1].speaker.toLowerCase() as 'doctor' | 'patient' : undefined;
                const detectedSpeaker = detectSpeaker(last.text.trim(), lastSpeaker);
                const speaker = detectedSpeaker === 'doctor' ? 'Doctor' : 'Patient';

                // Add to context for Gemini processing
                console.log(`Adding to transcript: ${speaker}: ${last.text.trim()}`);
                addTranscript(speaker, last.text.trim());

                return [...prev, { speaker, text: last.text.trim() }];
            });
        }
    }, [finals, addTranscript]);

    // Smart speaker detection function
    const detectSpeaker = (text: string, previousSpeaker?: 'doctor' | 'patient'): 'doctor' | 'patient' => {
        const lowerText = text.toLowerCase();

        // Doctor patterns
        const doctorPatterns = ['can you', 'how long', 'any pain', 'let me', 'show me', 'describe the',
            'i recommend', 'we need to', 'you should', 'prescription', 'medication', 'treatment',
            'diagnosis', 'symptoms', 'blood pressure', 'heart rate', 'x-ray', 'lab results'];

        // Patient patterns
        const patientPatterns = ['i feel', "i'm feeling", 'it hurts', 'i have', "i've been",
            'my pain', 'my symptoms', "i can't", 'it started', "i'm worried", 'headache',
            'nausea', 'dizzy', 'what does this mean', 'is this serious', 'will i be okay'];

        const doctorScore = doctorPatterns.reduce((score, pattern) =>
            lowerText.includes(pattern) ? score + 1 : score, 0);
        const patientScore = patientPatterns.reduce((score, pattern) =>
            lowerText.includes(pattern) ? score + 1 : score, 0);

        // Medical terms bonus for doctors
        if (lowerText.includes('diagnosis') || lowerText.includes('prescription') ||
            lowerText.includes('blood pressure')) {
            return 'doctor';
        }

        // Personal pronouns bonus for patients
        if ((lowerText.startsWith('i ') || lowerText.includes(' i ')) && patientScore > 0) {
            return 'patient';
        }

        if (doctorScore > patientScore) return 'doctor';
        if (patientScore > doctorScore) return 'patient';

        // Fallback: alternate speakers
        return previousSpeaker === 'doctor' ? 'patient' : 'doctor';
    };    // Auto scroll to bottom when new message is added
    useEffect(() => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [transcript, interim]);

    const patientsToShow = isHovered ? patients : (activePatient ? [activePatient] : []);

    return (
        <div className="h-full bg-gray-100 p-4">
            <div className="flex flex-col space-y-4">
                {/* Today's Patients Card */}
                <div
                    className="bg-white/70 backdrop-blur-sm px-4 py-4 rounded-lg shadow-md"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <h3 className="text-md font-semibold text-gray-700 mb-4">Today's Appointments</h3>
                    <div className={`space-y-3 overflow-y-auto transition-all duration-500 ${isHovered ? 'h-64' : 'h-15'}`}>
                        {patientsToShow.map((patient) => (
                            <div
                                key={patient.id}
                                className={`p-3 rounded cursor-pointer transition-all mx-1 ${patient.status === 'active'
                                    ? 'bg-white text-gray-800 shadow-md'
                                    : 'bg-white hover:bg-gray-50 opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <div className="flex justify-between items-center ">
                                    <p className="font-semibold text-sm">{patient.name}</p>
                                    <p className="text-sm">{patient.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Patient Details Card */}
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
                    <h3 className="text-md font-semibold text-gray-700 mb-4">Active Patient Vitals</h3>
                    {activePatient ? (
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="font-semibold text-gray-600">Patient: </span>
                                {activePatient.name}
                            </div>
                            <div className="flex justify-between">
                                <div><span className="font-semibold text-gray-600">Age:</span> {activePatient.age}</div>
                                <div><span className="font-semibold text-gray-600">Weight:</span> {activePatient.weight}</div>
                            </div>
                            <div className="flex justify-between">
                                <div><span className="font-semibold text-gray-600">Blood Pressure:</span> {activePatient.bp}</div>
                                <div><span className="font-semibold text-gray-600">Glucose:</span> {activePatient.sugarLevel}</div>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-600">Medical History: </span>
                                {activePatient.pastDiseases}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No active patient selected.</p>
                    )}
                </div>

                {/* Live Transcription Card */}
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-md mb-3 flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></span>
                        Live Transcription
                        <button
                            onClick={() => (isListening ? stop() : start())}
                            className={`ml-auto flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${isListening ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            aria-pressed={isListening}
                            aria-label={isListening ? 'Stop microphone' : 'Start microphone'}
                        >
                            {isListening ? 'Stop Mic' : 'Start Mic'}
                        </button>
                    </h3>
                    {error && (
                        <div className="mb-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1" aria-live="polite">
                            {error}
                        </div>
                    )}
                    <div
                        id="chat-container"
                        className="space-y-3 h-48 overflow-y-auto text-sm pr-2 scroll-smooth scrollbar-hide"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {transcript.map((line, index) => {
                            const isLatestMessage = index === transcript.length - 1;
                            return (
                                <div
                                    key={`final-${index}`}
                                    className={`flex transition-all duration-300 ease-in-out ${line.speaker === 'Doctor' ? 'justify-start' : 'justify-end'} ${isLatestMessage ? 'animate-[slideInUp_0.4s_ease-out]' : ''}`}
                                >
                                    <div className={`p-2 rounded-lg max-w-[85%] shadow-sm ${line.speaker === 'Doctor' ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'}`}>
                                        <p className="text-xs">{line.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                        {interim && (
                            <div className="flex justify-end opacity-80">
                                <div className="p-2 rounded-lg max-w-[85%] bg-blue-100 text-gray-800 border border-blue-200">
                                    <p className="text-xs">{interim}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
