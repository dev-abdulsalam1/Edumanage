"use client";
import React from "react";

export default function Loader({ size = "w-15 h-15", color = "border-blue-600" }) {
    return (
        <div className="flex items-center justify-center">
            <div
                className={`animate-spin rounded-full border-4 border-green-300 ${color} ${size} border-t-transparent`}
            />
        </div>
    );
}
