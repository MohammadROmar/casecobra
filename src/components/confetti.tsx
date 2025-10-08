'use client';

import { useState, useEffect } from 'react';
import ReactConfetti from 'react-dom-confetti';

export default function Confetti() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden select-none"
    >
      <ReactConfetti
        active={showConfetti}
        config={{ elementCount: 200, spread: 90 }}
      />
    </div>
  );
}
