import React from 'react';

const TopActionButtons: React.FC = () => {
    return (
        <div className="top-action-buttons flex justify-between items-center mb-6 shrink-0">
            <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white/10 backdrop-blur-lg text-gray-800 rounded-lg border border-white/20 shadow-sm hover:bg-white/20 hover:border-white/40 hover:shadow-md transition-all duration-300">
                    Reports
                </button>
                <button className="px-4 py-2 bg-white/10 backdrop-blur-lg text-gray-800 rounded-lg border border-white/20 shadow-sm hover:bg-white/20 hover:border-white/40 hover:shadow-md transition-all duration-300">
                    History
                </button>
            </div>
            <div className="flex space-x-2">
                <button className="px-4 py-2 text-red-300 font-medium rounded-lg border border-red-300/30 shadow-sm hover:bg-red-200/30 hover:text-red-500 hover:border-red-300/50 hover:shadow-md transition-all duration-300">
                    Skip Patient
                </button>
                <button className="px-4 py-2 bg-red-500/20 backdrop-blur-lg text-red-600 font-medium rounded-lg border border-red-300/30 shadow-sm hover:bg-red-500/30 hover:text-red-700 hover:border-red-300/50 hover:shadow-md transition-all duration-300">
                    End Session
                </button>
            </div>
        </div>
    );
};

export default TopActionButtons;