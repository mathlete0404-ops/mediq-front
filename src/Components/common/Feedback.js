import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { useAppContext } from '@/Components/contexts/AppContext';

export default function Feedback({ context }) {
  const { t } = useAppContext();
  const [selection, setSelection] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (feedback) => {
    setSelection(feedback);
  };

  const handleSubmit = () => {
    console.log({
      context,
      feedback: selection,
      comment,
      timestamp: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-8 text-center p-4 bg-green-50 text-green-700 rounded-lg">
        <p>{t('feedback_thanks')}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <p className="text-center font-semibold text-gray-700 mb-4">{t('was_this_helpful')}</p>
      <div className="flex justify-center gap-4">
        <Button
          variant={selection === 'yes' ? 'default' : 'outline'}
          className={`w-24 ${selection === 'yes' ? 'bg-blue-600' : 'bg-white'}`}
          onClick={() => handleSelect('yes')}
        >
          <ThumbsUp className="w-4 h-4 mr-2" />
          {t('yes')}
        </Button>
        <Button
          variant={selection === 'no' ? 'destructive' : 'outline'}
          className="w-24 bg-white"
          onClick={() => handleSelect('no')}
        >
          <ThumbsDown className="w-4 h-4 mr-2" />
          {t('no')}
        </Button>
      </div>

      <AnimatePresence>
        {selection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t('comment_placeholder')}
              className="min-h-[80px]"
            />
            <Button onClick={handleSubmit} className="w-full mt-2">
              {t('submit_feedback')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}