import React from 'react'

const MainArea = () => {
    return (
        <div className="h-full bg-white p-6 flex flex-col">
            <div className="top-action-buttons flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                        Reports
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                        History
                    </button>
                </div>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    Skip Patient
                </button>
            </div>

            <div className="medicine-or-tests-recommendation-area flex-1 flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Doctor's Notes & Recommendations</h2>
                <textarea
                    className="w-full flex-1 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your medicine or test recommendations here..."
                ></textarea>
                <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg self-end hover:bg-blue-700 transition">
                    Send Recommendation
                </button>
            </div>
        </div>
    )
}

export default MainArea