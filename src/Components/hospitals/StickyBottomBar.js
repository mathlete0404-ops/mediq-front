import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/Components/ui/button';
import { Map } from 'lucide-react';

export default function StickyBottomBar({ count, onShowMap }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4"
        >
          <div className="max-w-xl mx-auto">
            <Button
              onClick={onShowMap}
              className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700 shadow-2xl rounded-2xl"
            >
              <Map className="w-5 h-5 mr-3" />
              선택한 {count}곳 지도에서 보기
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}