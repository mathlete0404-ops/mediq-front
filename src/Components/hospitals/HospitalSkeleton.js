import React from 'react';

export default function HospitalSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl border bg-white/60 dark:bg-white/5 backdrop-blur-md p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      ))}
    </div>
  );
}