'use client';

import { useState, useEffect } from 'react';

export default function TestApiPage() {
    const [apiData, setApiData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch('/api/test');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setApiData(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching API:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">API Test Page</h1>

            {loading && (
                <div className="bg-blue-100 text-blue-700 p-4 rounded mb-6">
                    Loading API data...
                </div>
            )}

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                    Error: {error}
                </div>
            )}

            {apiData && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <span className="font-semibold">Status:</span>
                        <span className={`ml-2 ${apiData.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {apiData.status}
                        </span>
                    </div>

                    <div className="mb-4">
                        <span className="font-semibold">Message:</span>
                        <span className="ml-2">{apiData.message}</span>
                    </div>

                    <div className="mb-4">
                        <span className="font-semibold">Timestamp:</span>
                        <span className="ml-2">{new Date(apiData.timestamp).toLocaleString()}</span>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-2">Available Endpoints:</h2>
                        <ul className="list-disc list-inside space-y-1">
                            {apiData.endpoints?.map((endpoint: string) => (
                                <li key={endpoint} className="text-blue-600">
                                    {endpoint}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
} 