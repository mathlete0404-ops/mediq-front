
import React from 'react';
import { Stethoscope } from 'lucide-react';

export default function Logo({ size = 40, title = 'MedIQ — Find Smarter, Heal Faster.' }) {
  const circleSize = size;
  const tipWidth = Math.max(6, Math.round(size * 0.3));
  const tipHeight = Math.max(6, Math.round(size * 0.18));

  return (
    <div className="relative inline-flex items-center" aria-label="MedIQ Logo" title={title}>
      <div
        className="relative"
        style={{ width: circleSize, height: circleSize + tipHeight }}
      >
        {/* Map-pin head (circle) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full shadow-md ring-1 ring-[#0E2B66]/40 flex items-center justify-center"
          style={{ width: circleSize, height: circleSize, top: 0, backgroundColor: '#071B47' }}
        >
          {/* Circuit dots (subtle AI motif) */}
          <span className="absolute w-1 h-1 rounded-full" style={{ top: '28%', left: '28%', backgroundColor: '#4FB8FF' }} />
          <span className="absolute w-1 h-1 rounded-full" style={{ top: '46%', right: '26%', backgroundColor: '#4FB8FF' }} />
          <span className="absolute w-[10px] h-[1.5px]" style={{ top: '36%', left: '40%', backgroundColor: '#4FB8FF' }} />
          {/* Stethoscope icon */}
          <Stethoscope
            style={{ width: circleSize * 0.55, height: circleSize * 0.55 }}
            className="text-[#4FB8FF]"
          />
        </div>
        {/* Map-pin tip (triangle) */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: 0,
            width: 0,
            height: 0,
            borderLeft: `${Math.round(tipWidth / 2)}px solid transparent`,
            borderRight: `${Math.round(tipWidth / 2)}px solid transparent`,
            borderTop: `${tipHeight}px solid #071B47`,
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))'
          }}
        />
      </div>
    </div>
  );
}
