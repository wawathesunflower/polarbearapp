import { useState, useEffect } from 'react';
import { Heart, CheckCircle } from 'lucide-react';

interface PrayerEntry {
  date: string;
  day: 'A' | 'B';
  content: string;
  marked: boolean;
}

export default function PrayerCorner() {
  const [entries, setEntries] = useState<PrayerEntry[]>(() => {
    const stored = localStorage.getItem('polar-bear-prayers');
    return stored ? JSON.parse(stored) : [];
  });
  const [currentContent, setCurrentContent] = useState('');
  const [currentDay, setCurrentDay] = useState<'A' | 'B'>('A');
  const [hasEnteredToday, setHasEnteredToday] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const todayEntry = entries.find(e => e.date === today);

    if (todayEntry) {
      setCurrentContent(todayEntry.content);
      setCurrentDay(todayEntry.day);
      setHasEnteredToday(true);
    } else {
      const nextDay = entries.length === 0 ? 'A' : entries[entries.length - 1].day === 'A' ? 'B' : 'A';
      setCurrentDay(nextDay);
      setCurrentContent('');
      setHasEnteredToday(false);
    }
  }, [entries]);

  const savePrayer = () => {
    if (!currentContent.trim()) return;

    const today = new Date().toDateString();
    const existingIndex = entries.findIndex(e => e.date === today);

    let updated: PrayerEntry[];
    if (existingIndex >= 0) {
      updated = [...entries];
      updated[existingIndex] = {
        ...updated[existingIndex],
        content: currentContent,
      };
    } else {
      updated = [
        ...entries,
        {
          date: today,
          day: currentDay,
          content: currentContent,
          marked: false,
        },
      ];
    }

    setEntries(updated);
    localStorage.setItem('polar-bear-prayers', JSON.stringify(updated));
    setHasEnteredToday(true);
  };

  const markAsRead = (date: string) => {
    const updated = entries.map(e =>
      e.date === date ? { ...e, marked: !e.marked } : e
    );
    setEntries(updated);
    localStorage.setItem('polar-bear-prayers', JSON.stringify(updated));
  };

  const getRecentEntries = () => {
    return entries.slice(-7);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-cyan-500/20 pb-6">
        <h1 className="text-3xl md:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 tracking-wider">
          The Prayer Corner
        </h1>
        <p className="text-gray-400 mt-2 tracking-wide text-sm md:text-base">Reflection & Gratitude</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-2">
          <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-blue-400 fill-blue-400/20" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-light text-blue-300 tracking-wide">
                  Today's Prayer - Day {currentDay}
                </h2>
                <p className="text-xs text-gray-500 tracking-widest uppercase mt-1">
                  {hasEnteredToday ? 'Already saved' : 'Write your thoughts'}
                </p>
              </div>
            </div>

            <textarea
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
              placeholder="Share what's on your heart. Pray, reflect, give thanks..."
              className="w-full bg-black/30 border border-blue-500/20 rounded-lg p-4 md:p-6 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/40 transition-all resize-none min-h-[250px] md:min-h-[300px] font-light leading-relaxed text-sm md:text-base"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={savePrayer}
                disabled={!currentContent.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600/40 to-cyan-600/40 border border-blue-500/50 rounded-lg text-blue-300 hover:border-blue-400/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-light tracking-wider uppercase text-xs md:text-sm"
              >
                Save Prayer
              </button>
              <button
                onClick={() => setCurrentContent('')}
                className="flex-1 sm:flex-none px-4 md:px-6 py-3 bg-gray-800/30 border border-gray-600/30 rounded-lg text-gray-400 hover:border-gray-500/50 transition-all font-light tracking-wider uppercase text-xs md:text-sm"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="backdrop-blur-md bg-gray-800/20 border border-blue-500/20 rounded-lg p-6 space-y-4">
            <h3 className="text-sm tracking-widest uppercase text-blue-300">Day Cycle</h3>
            <div className="space-y-2 text-xs text-gray-400">
              <div className={`px-3 py-2 rounded border ${currentDay === 'A' ? 'bg-blue-500/20 border-blue-500/40 text-blue-300' : 'border-gray-600/30'}`}>
                Day A - Reflection
              </div>
              <div className={`px-3 py-2 rounded border ${currentDay === 'B' ? 'bg-blue-500/20 border-blue-500/40 text-blue-300' : 'border-gray-600/30'}`}>
                Day B - Gratitude
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4 leading-relaxed">
              Alternate between reflection and gratitude. Find peace in both.
            </p>
          </div>
        </div>
      </div>

      {entries.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-light text-cyan-300 tracking-wider">Recent Prayers</h3>
          <div className="grid gap-3">
            {getRecentEntries().map((entry) => (
              <div
                key={entry.date}
                className={`backdrop-blur-md border rounded-lg p-4 md:p-6 transition-all ${
                  entry.marked
                    ? 'bg-green-900/20 border-green-500/30'
                    : 'bg-gray-800/20 border-blue-500/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs tracking-widest uppercase text-gray-400">{entry.date} • Day {entry.day}</span>
                      {entry.marked && (
                        <span className="text-xs tracking-widest uppercase text-green-400 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Marked
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-gray-300 line-clamp-2">{entry.content}</p>
                  </div>
                  <button
                    onClick={() => markAsRead(entry.date)}
                    className={`w-full sm:w-auto px-3 py-2 rounded text-xs md:text-sm font-light tracking-wider uppercase whitespace-nowrap transition-all flex-shrink-0 ${
                      entry.marked
                        ? 'bg-green-500/20 border border-green-500/40 text-green-400 hover:border-green-400/60'
                        : 'bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:border-blue-400/50'
                    }`}
                  >
                    {entry.marked ? 'Read' : 'Mark'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
