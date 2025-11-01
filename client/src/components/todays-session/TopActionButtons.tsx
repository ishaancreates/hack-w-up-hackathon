import React, { useState } from 'react';
import { FileText, Printer, Share2 } from 'lucide-react';
import ReportViewer from './ReportViewer';

const TopActionButtons = () => {
    const [isReportViewerOpen, setIsReportViewerOpen] = useState(false);

    return (
        <>
            <div className="flex justify-end gap-4 mb-6">
                <button 
                    onClick={() => setIsReportViewerOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                >
                    <FileText className="w-5 h-5" />
                    Reports
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md">
                    <Printer className="w-5 h-5" />
                    Print
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-md">
                    <Share2 className="w-5 h-5" />
                    Share
                </button>
            </div>

            <ReportViewer 
                isOpen={isReportViewerOpen} 
                onClose={() => setIsReportViewerOpen(false)} 
            />
        </>
    );
};

export default TopActionButtons;
