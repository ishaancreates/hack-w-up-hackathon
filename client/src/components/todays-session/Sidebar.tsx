import React, { useState, useEffect } from 'react';

const initialPatients = [
    { id: 1, name: 'Priya Sharma', time: '10:00 AM', status: 'active', age: 38, pastDiseases: 'Allergic Rhinitis', weight: '68 kg', bp: '118/75', sugarLevel: '92 mg/dL' },
    { id: 2, name: 'Rajesh Kumar', time: '10:30 AM', status: 'waiting', age: 55, pastDiseases: 'Type 2 Diabetes', weight: '95 kg', bp: '135/88', sugarLevel: '140 mg/dL' },
    { id: 3, name: 'Anita Patel', time: '11:00 AM', status: 'waiting', age: 29, pastDiseases: 'None', weight: '58 kg', bp: '110/70', sugarLevel: '85 mg/dL' },
    { id: 4, name: 'Suresh Gupta', time: '11:30 AM', status: 'waiting', age: 67, pastDiseases: 'Coronary Artery Disease', weight: '82 kg', bp: '145/92', sugarLevel: '105 mg/dL' },
    { id: 5, name: 'Meera Singh', time: '12:00 PM', status: 'waiting', age: 42, pastDiseases: 'Migraines', weight: '75 kg', bp: '125/80', sugarLevel: '98 mg/dL' },
];

const conversation = [
    { speaker: 'Doctor', text: "नमस्ते प्रिया जी, आप कैसा महसूस कर रही हैं?" },
    { speaker: 'Patient', text: "बहुत बेहतर डॉक्टर साहब, दवाई का असर हो रहा है।" },
    { speaker: 'Doctor', text: "कोई साइड इफेक्ट तो नहीं हो रहा?" },
    { speaker: 'Patient', text: "बस सुबह थोड़ी नींद आती है।" },
    { speaker: 'Doctor', text: "ठीक है, हम इसे देखते रहेंगे। अब आपकी जांच करते हैं।" },
    { speaker: 'Patient', text: "जी हाँ डॉक्टर साहब, ठीक है।" },
    { speaker: 'Doctor', text: "आपका ब्लड प्रेशर नॉर्मल है।" },
    { speaker: 'Patient', text: "धन्यवाद डॉक्टर जी।" },
];

const Sidebar = () => {
    const [patients, setPatients] = useState(initialPatients);
    const [isHovered, setIsHovered] = useState(false);
    const activePatient = patients.find(p => p.status === 'active');
    const [transcript, setTranscript] = useState<{ speaker: string; text: string }[]>([]);
    const [conversationIndex, setConversationIndex] = useState(0);

    useEffect(() => {
        setTranscript([]);
        setConversationIndex(0);
    }, [activePatient]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const nextIndex = conversationIndex % conversation.length;
            setTranscript(prev => [...prev, conversation[nextIndex]]);
            setConversationIndex(prev => prev + 1);
        }, 1500); // Delay between messages

        return () => clearTimeout(timer);
    }, [conversationIndex, activePatient]);

    // Auto scroll to bottom when new message is added
    useEffect(() => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [transcript]);

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
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                        Live Transcription
                    </h3>
                    <div
                        id="chat-container"
                        className="space-y-3 h-48 overflow-y-auto text-sm pr-2 scroll-smooth scrollbar-hide"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {transcript.map((line, index) => {
                            const isLatestMessage = index === transcript.length - 1;
                            return (
                                <div
                                    key={`${conversationIndex}-${index}`}
                                    className={`flex transition-all duration-300 ease-in-out ${line.speaker === 'Doctor' ? 'justify-start' : 'justify-end'} ${isLatestMessage ? 'animate-[slideInUp_0.4s_ease-out]' : ''}`}
                                >
                                    <div className={`p-2 rounded-lg max-w-[85%] shadow-sm ${line.speaker === 'Doctor' ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'}`}>
                                        <p className="text-xs">{line.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
