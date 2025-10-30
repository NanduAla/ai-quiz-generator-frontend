// frontend/src/components/HistoryTable.jsx
import React from "react";

export default function HistoryTable({ history, isLoading, error, onSelectQuiz }) {
    if (isLoading) {
        return <div className="p-6 text-center text-indigo-600">Loading quiz history...</div>;
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-700 bg-red-100 border-l-4 border-red-500 rounded-lg">
                {error}
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="p-6 text-center text-gray-600 bg-gray-50 rounded-lg">
                No quizzes have been saved yet. Generate one to see it here!
            </div>
        );
    }

    return (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {/* Table view for larger screens */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                URL
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date Generated
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {history.map((item) => (
                            <tr key={item.id} className="hover:bg-indigo-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 truncate max-w-xs">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {item.url}
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(item.date_generated).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onSelectQuiz(item.id)}
                                        className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-150"
                                    >
                                        View Quiz
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card view for small devices */}
            <div className="sm:hidden space-y-4 p-4">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-200"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-sm text-indigo-600 mb-1 truncate">
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {item.url}
                            </a>
                        </p>
                        <p className="text-sm text-gray-500 mb-3">
                            Generated on: {new Date(item.date_generated).toLocaleDateString()}
                        </p>
                        <button
                            onClick={() => onSelectQuiz(item.id)}
                            className="w-full bg-indigo-600 text-white text-sm font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-150"
                        >
                            View Quiz
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
