import React from 'react';
import TestCard from './TestCard';

interface TestsSectionProps {
    selectedTests: string[];
    onToggleTest: (test: string) => void;
}

const TestsSection: React.FC<TestsSectionProps> = ({
    selectedTests,
    onToggleTest
}) => {
    const tests = [
        'Complete Blood Count (CBC)',
        'Blood Sugar (Fasting)',
        'Lipid Profile',
        'Thyroid Function Test',
        'Chest X-Ray',
        'ECG'
    ];

    return (
        <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-base font-semibold mb-3 text-gray-700 shrink-0">Recommended Tests</h3>
            <div className="flex-1 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow border border-gray-200 overflow-y-auto">
                <div className="space-y-2.5 pb-16">
                    {tests.map((test) => (
                        <TestCard
                            key={test}
                            name={test}
                            isSelected={selectedTests.includes(test)}
                            onToggle={() => onToggleTest(test)}
                        />
                    ))}
                </div>
                <div className="sticky bottom-0 -mx-4 px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-gray-200">
                    <button className="w-full h-11 px-4 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition shadow-none hover:shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300">
                        Proceed with Tests
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestsSection;