import { useEffect, useState } from 'react';

export default function HoustonClock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const houstonTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }));

      const hours = houstonTime.getHours().toString().padStart(2, '0');
      const minutes = houstonTime.getMinutes().toString().padStart(2, '0');
      const seconds = houstonTime.getSeconds().toString().padStart(2, '0');

      setTime(`${hours}:${minutes}:${seconds}`);

      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Chicago'
      };
      setDate(houstonTime.toLocaleDateString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-6xl md:text-7xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 tabular-nums">
        {time}
      </div>
      <div className="text-sm md:text-base text-gray-400 tracking-widest uppercase">
        {date}
      </div>
      <div className="text-xs text-gray-500 tracking-wider">
        Houston, Texas
      </div>
    </div>
  );
}
