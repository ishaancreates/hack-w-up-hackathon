import React from 'react';
import { X, Download, Printer, Zap } from 'lucide-react';

interface PrescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedMedications: string[];
    selectedTests: string[];
    patientInfo?: {
        name: string;
        age: number;
        weight: string;
        bp: string;
        sugarLevel: string;
        pastDiseases: string;
    };
    transcript: { speaker: string; text: string }[];
    onApproveWorkflow?: () => Promise<void>;
}

// Print-specific styles
const printStyles = `
@media print {
    /* Hide everything on the page */
    body * {
        visibility: hidden;
    }
    
    /* Show only the print prescription */
    .print-prescription-only, 
    .print-prescription-only * {
        visibility: visible;
    }
    
    /* Position at top of page */
    .print-prescription-only {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: white;
        padding: 0;
        margin: 0;
    }
    
    /* Hide the modal and preview */
    .no-print,
    .print-hide {
        display: none !important;
    }
    
    @page {
        margin: 0.75in 0.5in;
        size: A4 portrait;
    }
    
    /* Ensure proper page breaks */
    .print-prescription-only {
        page-break-after: auto;
    }
    
    /* Print-specific adjustments */
    .print-prescription-only table {
        page-break-inside: avoid;
    }
}

@media screen {
    .print-prescription-only {
        display: none;
    }
}
`;



const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
    isOpen,
    onClose,
    selectedMedications,
    selectedTests,
    patientInfo,
    transcript,
    onApproveWorkflow
}) => {
    if (!isOpen) return null;

    // Extract symptoms from transcript (patient's statements)
    const symptoms = transcript
        .filter(t => t.speaker.toLowerCase() === 'patient')
        .map(t => t.text)
        .join('; ');

    // Generate assessment from doctor's observations
    const assessment = transcript
        .filter(t => t.speaker.toLowerCase() === 'doctor')
        .slice(-3) // Last 3 doctor statements
        .map(t => t.text)
        .join('. ');

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const prescriptionText = document.getElementById('prescription-content')?.innerText;
        const blob = new Blob([prescriptionText || ''], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Prescription_${patientInfo?.name || 'Patient'}_${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleApproveWorkflow = async () => {
        if (onApproveWorkflow) {
            await onApproveWorkflow();
        }
    };

    return (
        <>
            <style>{printStyles}</style>

            {/* Print-Only Prescription (Hidden on Screen) */}
            <div className="print-prescription-only">
                <div className="max-w-[8.5in] mx-auto bg-white p-8">
                    {/* Doctor's Letterhead */}
                    <div className="border-b-4 border-blue-700 pb-6 mb-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-blue-900 mb-2 tracking-wide">Dr. Curalynx</h1>
                            <p className="text-base text-gray-700 font-medium">MBBS, MD (General Medicine)</p>
                            <p className="text-sm text-gray-600 mt-1">Reg. No: MCI/[Registration Number]</p>
                            <div className="mt-3 text-sm text-gray-600">
                                <p className="font-medium">[Clinic/Hospital Name]</p>
                                <p>[Complete Address] | Phone: [Contact Number] | Email: [Email]</p>
                            </div>
                        </div>
                    </div>

                    {/* Patient Details */}
                    <div className="mb-8">
                        <div className="space-y-3">
                            <div className="flex items-center border-b border-dotted border-gray-400 pb-1">
                                <span className="font-bold text-gray-800 w-32">Patient Name:</span>
                                <span className="text-gray-900 text-lg">{patientInfo?.name || '___________________________'}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex items-center border-b border-dotted border-gray-400 pb-1">
                                    <span className="font-bold text-gray-800 w-20">Age:</span>
                                    <span className="text-gray-900">{patientInfo?.age ? `${patientInfo.age} Years` : '______'}</span>
                                </div>
                                <div className="flex items-center border-b border-dotted border-gray-400 pb-1">
                                    <span className="font-bold text-gray-800 w-20">Sex:</span>
                                    <span className="text-gray-900">M/F</span>
                                </div>
                                <div className="flex items-center border-b border-dotted border-gray-400 pb-1">
                                    <span className="font-bold text-gray-800 w-20">Date:</span>
                                    <span className="text-gray-900">{currentDate}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex items-center border-b border-dotted border-gray-400 pb-1">
                                    <span className="font-bold text-gray-800 w-20">Weight:</span>
                                    <span className="text-gray-900">{patientInfo?.weight || '______'}</span>
                                </div>
                                <div className="flex items-center border-b border-dotted border-gray-400 pb-1">
                                    <span className="font-bold text-gray-800 w-20">BP:</span>
                                    <span className="text-gray-900">{patientInfo?.bp || '______'}</span>
                                </div>
                                <div className="flex items-center border-b border-dotted border-gray-400 pb-1">
                                    <span className="font-bold text-gray-800 w-20">Sugar:</span>
                                    <span className="text-gray-900">{patientInfo?.sugarLevel || '______'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chief Complaints */}
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-900 text-base mb-2 uppercase tracking-wide">Chief Complaints:</h3>
                        <div className="pl-6 text-gray-800 leading-relaxed">
                            {symptoms || 'As per clinical examination'}
                        </div>
                    </div>

                    {/* Diagnosis/Assessment */}
                    {assessment && (
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 text-base mb-2 uppercase tracking-wide">Diagnosis:</h3>
                            <div className="pl-6 text-gray-800 leading-relaxed">
                                {assessment}
                            </div>
                        </div>
                    )}

                    {/* Rx Symbol and Medicines */}
                    <div className="mb-8">
                        <div className="flex items-start mb-4">
                            <div className="text-7xl font-bold text-blue-700 mr-6 leading-none" style={{ fontFamily: 'Georgia, serif' }}>℞</div>
                            <div className="flex-1">
                                {selectedMedications.length > 0 ? (
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b-2 border-gray-800">
                                                <th className="text-left py-2 font-bold text-gray-900">Medicine Name</th>
                                                <th className="text-center py-2 font-bold text-gray-900 w-32">Dosage</th>
                                                <th className="text-center py-2 font-bold text-gray-900 w-32">Duration</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedMedications.map((med, index) => (
                                                <tr key={index} className="border-b border-gray-300">
                                                    <td className="py-3 text-gray-800">
                                                        <span className="font-semibold">{index + 1}.</span> {med}
                                                    </td>
                                                    <td className="text-center py-3 font-mono font-semibold text-gray-800">1-0-1</td>
                                                    <td className="text-center py-3 text-gray-800">5 days</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-gray-600 italic">No medications prescribed</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Investigations */}
                    {selectedTests.length > 0 && (
                        <div className="mb-8">
                            <h3 className="font-bold text-gray-900 text-base mb-3 uppercase tracking-wide">Investigations Advised:</h3>
                            <div className="pl-6">
                                <ul className="space-y-2">
                                    {selectedTests.map((test, index) => (
                                        <li key={index} className="text-gray-800">
                                            <span className="font-semibold">{index + 1}.</span> {test}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* General Advice */}
                    <div className="mb-12">
                        <h3 className="font-bold text-gray-900 text-base mb-3 uppercase tracking-wide">General Advice:</h3>
                        <div className="pl-6">
                            <ul className="space-y-2 text-gray-800">
                                <li>• Take medicines after meals</li>
                                <li>• Drink plenty of water (8-10 glasses per day)</li>
                                <li>• Complete the full course of prescribed medicines</li>
                                <li>• Follow up if symptoms persist or worsen</li>
                                <li>• Avoid self-medication</li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="mt-16 pt-6 border-t-2 border-gray-300">
                        <div className="flex justify-between items-end">
                            <div className="text-sm text-gray-700">
                                <p className="mb-2"><span className="font-bold">Next Visit:</span> ____________________</p>
                                <p><span className="font-bold">Follow-up Date:</span> _______________</p>
                            </div>
                            <div className="text-right">
                                <div className="mb-16"></div>
                                <div className="border-t-2 border-gray-800 pt-2 w-48">
                                    <p className="font-bold text-gray-900">Doctor's Signature</p>
                                    <p className="text-xs text-gray-600 mt-1">Dr. [Doctor Name]</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer Footer */}
                    <div className="mt-8 text-center text-xs text-gray-500 border-t pt-3">
                        <p>This is a computer-generated prescription and is valid only with doctor's signature</p>
                        <p className="mt-1">For any queries, please contact: [Contact Number]</p>
                    </div>
                </div>
            </div>

            {/* Screen Modal */}
            <div className="print-hide fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 no-print">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Medical Prescription</h2>
                            <p className="text-sm text-gray-500 mt-1">Preview</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDownload}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Download"
                            >
                                <Download className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handlePrint}
                                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Print"
                            >
                                <Printer className="w-5 h-5" />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Content - Screen Preview Only */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="bg-white">
                            {/* Preview Header */}
                            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h3 className="text-lg font-bold text-blue-900 mb-2">Prescription Preview</h3>
                                <p className="text-sm text-blue-700">Click "Print Prescription" to get the professional prescription format</p>
                            </div>

                            {/* Patient Info Summary */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-base font-semibold text-gray-800 mb-3">Patient Information</h3>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-600">Name:</span>
                                        <span className="ml-2 text-gray-800">{patientInfo?.name || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Age:</span>
                                        <span className="ml-2 text-gray-800">{patientInfo?.age || 'N/A'} years</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Weight:</span>
                                        <span className="ml-2 text-gray-800">{patientInfo?.weight || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">BP:</span>
                                        <span className="ml-2 text-gray-800">{patientInfo?.bp || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Sugar:</span>
                                        <span className="ml-2 text-gray-800">{patientInfo?.sugarLevel || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Date:</span>
                                        <span className="ml-2 text-gray-800">{currentDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Symptoms/Complaints */}
                            {symptoms && (
                                <div className="mb-4 p-4 bg-orange-50 rounded-lg">
                                    <h3 className="text-sm font-semibold text-orange-900 mb-2">Chief Complaints</h3>
                                    <p className="text-sm text-orange-800">{symptoms}</p>
                                </div>
                            )}

                            {/* Assessment/Diagnosis */}
                            {assessment && (
                                <div className="mb-4 p-4 bg-green-50 rounded-lg">
                                    <h3 className="text-sm font-semibold text-green-900 mb-2">Diagnosis</h3>
                                    <p className="text-sm text-green-800">{assessment}</p>
                                </div>
                            )}

                            {/* Medications */}
                            {selectedMedications.length > 0 && (
                                <div className="mb-4 p-4 bg-purple-50 rounded-lg">
                                    <h3 className="text-sm font-semibold text-purple-900 mb-3">Prescribed Medications</h3>
                                    <ol className="space-y-2">
                                        {selectedMedications.map((med, index) => (
                                            <li key={index} className="text-sm text-purple-800">
                                                <span className="font-semibold">{index + 1}.</span> {med}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}

                            {/* Tests/Investigations */}
                            {selectedTests.length > 0 && (
                                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                                    <h3 className="text-sm font-semibold text-blue-900 mb-3">Recommended Tests</h3>
                                    <ul className="space-y-2">
                                        {selectedTests.map((test, index) => (
                                            <li key={index} className="text-sm text-blue-800">
                                                <span className="font-semibold">{index + 1}.</span> {test}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Empty State */}
                            {selectedMedications.length === 0 && selectedTests.length === 0 && (
                                <div className="p-8 text-center text-gray-500">
                                    <p>No medications or tests selected</p>
                                    <p className="text-xs mt-2">Select medications and tests from the session to generate prescription</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="no-print flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Close
                        </button>
                        <button
                            onClick={handlePrint}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Print Prescription
                        </button>
                        {onApproveWorkflow && (
                            <button
                                onClick={handleApproveWorkflow}
                                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 flex items-center gap-2 font-semibold"
                            >
                                <Zap className="w-4 h-4" />
                                Approve & Run Workflow
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrescriptionModal;
