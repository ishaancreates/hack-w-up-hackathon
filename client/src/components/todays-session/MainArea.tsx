import React, { useState } from 'react';
import TopActionButtons from './TopActionButtons';
import MedicationsSection from './MedicationsSection';
import TestsSection from './TestsSection';
import { Clock, FileText, Printer, Share2 } from 'lucide-react';
import ReportViewer from './ReportViewer';

const MainArea = () => {
    const [isReportViewerOpen, setIsReportViewerOpen] = useState(false);
    const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
    const [selectedTests, setSelectedTests] = useState<string[]>([]);

    const toggleMedication = (medication: string) => {
        setSelectedMedications(prev =>
            prev.includes(medication)
                ? prev.filter(m => m !== medication)
                : [...prev, medication]
        );
    };

    const toggleTest = (test: string) => {
        setSelectedTests(prev =>
            prev.includes(test)
                ? prev.filter(t => t !== test)
                : [...prev, test]
        );
    };

    return (
        <div className="h-full w-full bg-white p-6 flex flex-col overflow-hidden">
            <TopActionButtons />

            <div className="recommendations-area flex-1 flex flex-col min-h-0">
                <div className="flex gap-6 flex-1 min-h-0">
                    <MedicationsSection
                        selectedMedications={selectedMedications}
                        onToggleMedication={toggleMedication}
                    />

                    <TestsSection
                        selectedTests={selectedTests}
                        onToggleTest={toggleTest}
                    />
                </div>
            </div>

            {/* Reports, Print and Share buttons at the bottom */}
            <div className="flex justify-center gap-4 mt-4 shrink-0">
                <button
                    onClick={() => setIsReportViewerOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white/70 backdrop-blur-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    <FileText className="w-5 h-5" />
                    Reports
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-white/70 backdrop-blur-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <Clock className="w-5 h-5" />
                    History
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-white/70 backdrop-blur-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <Share2 className="w-5 h-5" />
                    Share
                </button>
            </div>

            <ReportViewer
                isOpen={isReportViewerOpen}
                onClose={() => setIsReportViewerOpen(false)}
            />
        </div>
    )
}

export default MainArea