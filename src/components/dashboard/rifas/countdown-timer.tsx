'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(targetDate.getTime() - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate.getTime() - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft <= 0) {
    return <span className="text-sm text-red-600 font-medium">La rifa ha finalizado.</span>;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="flex gap-2 font-mono text-sm text-gray-800">
      <TimeUnit value={days} label="Días" />
      <span className="font-bold">:</span>
      <TimeUnit value={hours} label="Horas" />
      <span className="font-bold">:</span>
      <TimeUnit value={minutes} label="Min" />
      <span className="font-bold">:</span>
      <TimeUnit value={seconds} label="Seg" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-bold text-lg">{value}</span>
      <span className="text-xs">{label}</span>
    </div>
  );
}
