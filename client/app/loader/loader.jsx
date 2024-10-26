"use client";
import React from "react";
import { Dumbbell, Utensils, Apple, Timer } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative">
        {/* Rotating circle of icons */}
        <div className="relative w-24 h-24 animate-spin">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dumbbell className="w-8 h-8 text-blue-500" />
          </div>
          <div className="absolute top-1/2 right-0 translate-y-1/2 translate-x-1/2">
            <Apple className="w-8 h-8 text-green-500" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <Utensils className="w-8 h-8 text-orange-500" />
          </div>
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
            <Timer className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        {/* Pulsing center circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse" />
        </div>

        {/* Orbit rings */}
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-200 animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-200 animate-[spin_8s_linear_infinite_reverse]" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
