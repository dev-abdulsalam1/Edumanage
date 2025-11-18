import { AlertTriangle } from 'lucide-react'
import React from 'react'

export default function FetchError({ refetch,message }) {
    return (
        <div className="flex flex-col items-center justify-center mt-10 text-red-600">
            <AlertTriangle className="w-6 h-6 mb-2" />
            <p className="text-center font-medium">{message}</p>
            {refetch && (  
                <button
                    onClick={refetch}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded"
                >
                    Refresh
                </button>
            )}
        </div>
    )
}
