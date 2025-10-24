import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';

export default function ChatInterface({ onSubmit, isLoading }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
  };

  return (
    <div className="space-y-3">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="증상을 입력하세요..."
        className="min-h-[120px]"
      />
      <Button onClick={handleSend} disabled={isLoading}>
        {isLoading ? '분석 중...' : '분석 시작'}
      </Button>
    </div>
  );
}