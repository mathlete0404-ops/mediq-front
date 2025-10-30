import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export default function ConversationView({ symptoms }) {
  if (!symptoms) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-4 p-4 mt-8 bg-white rounded-2xl shadow-md border"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <User className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-1 pt-1.5">
        <p className="font-semibold text-gray-700 mb-1">나의 증상</p>
        <p className="text-gray-800 leading-relaxed">{symptoms}</p>
      </div>
    </motion.div>
  );
}