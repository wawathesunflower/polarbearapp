import { useEffect, useState } from 'react';

export default function DestinyLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-2 border-cyan-500/30 rotate-45 animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-4 border-2 border-blue-400/40 rotate-0 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
          <div className="absolute inset-8 border-2 border-teal-400/50 rotate-45 animate-spin" style={{ animationDuration: '4s' }} />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 opacity-60 blur-xl animate-pulse" />
          </div>
        </div>

        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-cyan-400 text-sm font-light tracking-widest uppercase">
          Welcome Guardian. Initializing System
        </div>
      </div>
    </div>
  );
}
