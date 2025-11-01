import React, { useState } from 'react';
import { X, FileText, Calendar, User } from 'lucide-react';

// Sample report data
const sampleReports = [
    {
        id: 1,
        date: '2025-10-28',
        type: 'Blood Test',
        doctor: 'Dr. Mehta',
        patient: 'Priya Sharma',
        details: {
            hemoglobin: '12.5 g/dL',
            wbc: '7,500 cells/mcL',
            platelets: '250,000/mcL',
            rbc: '4.5 million/mcL',
            hematocrit: '38%',
        },
        summary: 'All values within normal range. Hemoglobin slightly on lower side but acceptable. Continue iron supplements as prescribed.',
    },
    {
        id: 2,
        date: '2025-10-25',
        type: 'X-Ray Chest',
        doctor: 'Dr. Singh',
        patient: 'Priya Sharma',
        details: {
            findings: 'Clear lung fields',
            heart: 'Normal cardiac silhouette',
            bones: 'No fractures detected',
            impression: 'Normal chest radiograph',
        },
        summary: 'Chest X-ray shows no abnormalities. Lung fields are clear with no signs of infection or fluid accumulation.',
    },
    {
        id: 3,
        date: '2025-10-20',
        type: 'ECG',
        doctor: 'Dr. Patel',
        patient: 'Priya Sharma',
        details: {
            heartRate: '72 bpm',
            rhythm: 'Sinus rhythm',
            prInterval: '0.16 sec',
            qrsDuration: '0.08 sec',
            qtInterval: '0.38 sec',
        },
        summary: 'Normal sinus rhythm with no evidence of arrhythmia or ischemic changes. Heart function appears normal.',
    },
    {
        id: 4,
        date: '2025-10-15',
        type: 'Lipid Profile',
        doctor: 'Dr. Kumar',
        patient: 'Priya Sharma',
        details: {
            totalCholesterol: '185 mg/dL',
            ldl: '110 mg/dL',
            hdl: '55 mg/dL',
            triglycerides: '100 mg/dL',
            vldl: '20 mg/dL',
        },
        summary: 'Lipid levels are within acceptable range. HDL could be improved with regular exercise. Continue healthy diet.',
    },
];

const ReportViewer = ({ isOpen, onClose }) => {
    const [selectedReport, setSelectedReport] = useState(sampleReports[0]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-[90%] max-w-6xl h-[90%] flex flex-col animate-[slideInUp_0.3s_ease-out]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FileText className="w-6 h-6" />
                        Patient Reports
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Three Column Layout */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Column 1: Reports List */}
                    <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
                        <div className="p-4">
                            <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                                Recent Reports
                            </h3>
                            <div className="space-y-2">
                                {sampleReports.map((report) => (
                                    <div
                                        key={report.id}
                                        onClick={() => setSelectedReport(report)}
                                        className={`p-4 rounded-lg cursor-pointer transition-all ${selectedReport.id === report.id
                                            ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
                                            : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-semibold text-gray-800">{report.type}</h4>
                                            <FileText className={`w-4 h-4 ${selectedReport.id === report.id ? 'text-blue-500' : 'text-gray-400'}`} />
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3 h-3" />
                                                <span>{report.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <User className="w-3 h-3" />
                                                <span>{report.doctor}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Report Details */}
                    <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                                Report Details
                            </h3>
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 mb-4">
                                <h4 className="text-xl font-bold text-gray-800 mb-3">{selectedReport.type}</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Date:</span>
                                        <span className="font-semibold text-gray-800">{selectedReport.date}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Doctor:</span>
                                        <span className="font-semibold text-gray-800">{selectedReport.doctor}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Patient:</span>
                                        <span className="font-semibold text-gray-800">{selectedReport.patient}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h5 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Test Results</h5>
                                {Object.entries(selectedReport.details).map(([key, value]) => (
                                    <div key={key} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 capitalize text-sm">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                                            </span>
                                            <span className="font-semibold text-gray-800 text-sm">{value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Summary */}
                    <div className="w-1/3 overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50">
                        <div className="p-6">
                            <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                                Summary & Analysis
                            </h3>
                            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1 h-12 bg-blue-500 rounded-full"></div>
                                        <h4 className="font-semibold text-gray-800">Clinical Summary</h4>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm mb-6">
                                    {selectedReport.summary}
                                </p>

                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <h5 className="font-semibold text-gray-700 text-sm mb-3">Status</h5>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Normal Range</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <h5 className="font-semibold text-gray-700 text-sm mb-3">Recommendations</h5>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1">•</span>
                                            <span>Continue current medication regimen</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1">•</span>
                                            <span>Follow-up test recommended in 3 months</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1">•</span>
                                            <span>Maintain healthy lifestyle and diet</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportViewer;
