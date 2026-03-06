import { ChevronRight } from 'lucide-react';
import Starfield from './Starfield';
import HoustonClock from './HoustonClock';

export default function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Starfield />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full space-y-12 text-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 animate-pulse">
              Hello Polar Bear
            </h1>

            <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-8 shadow-2xl">
            <HoustonClock />
          </div>

          <button
            onClick={onEnter}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="relative flex items-center gap-2 text-cyan-400 tracking-wider uppercase text-sm font-light">
              <span>Enter System</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-600 tracking-widest uppercase">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span>Polar Bear 2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
