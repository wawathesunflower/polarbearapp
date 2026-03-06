import { X } from 'lucide-react';

interface AffirmationCardProps {
  day: number;
  content: string;
  isToday: boolean;
  onClose: () => void;
}

export default function AffirmationCard({
  day,
  content,
  isToday,
  onClose,
}: AffirmationCardProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="unfold-animation w-full max-w-2xl backdrop-blur-xl bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/40 rounded-xl p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/30 transition-colors"
        >
          <X className="w-4 h-4 text-cyan-400" />
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-sm tracking-widest uppercase font-light text-cyan-400">
              Day {day}
              {isToday && ' • Today'}
            </div>
            <div className="h-px w-12 bg-gradient-to-r from-cyan-500/50 to-transparent" />
          </div>

          <div className="space-y-4">
            <p className="text-2xl leading-relaxed text-white font-light italic">
              "{content}"
            </p>

            <div className="pt-6 border-t border-cyan-500/20">
              <p className="text-sm text-gray-400 tracking-wide">
                This message was encrypted in The Vault and has been revealed to you today.
                Meditate on these words, mi amor.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <div className="w-2 h-2 rounded-full bg-cyan-500/50" />
            <span className="text-xs text-gray-500 tracking-widest uppercase">Polar Bear Archive</span>
          </div>
        </div>
      </div>
    </div>
  );
}
