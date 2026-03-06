import { useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AffirmationCard from './AffirmationCard';

interface Affirmation {
  id: string;
  day: number;
  content: string;
}

interface UnlockedDay {
  day: number;
}

export default function TheVault() {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [unlockedDays, setUnlockedDays] = useState<Set<number>>(new Set());
  const [todayDay, setTodayDay] = useState<number>(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const today = new Date();
      const dayOfMonth = today.getDate();
      setTodayDay(dayOfMonth);

      const { data: affirmData } = await supabase
        .from('affirmations')
        .select('id, day, content')
        .order('day');

      if (affirmData) {
        setAffirmations(affirmData);
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: unlockedData } = await supabase
          .from('affirmation_unlocks')
          .select('day')
          .eq('user_id', user.id);

        if (unlockedData) {
          const unlockedSet = new Set(unlockedData.map((u: UnlockedDay) => u.day));
          setUnlockedDays(unlockedSet);

          if (!unlockedSet.has(dayOfMonth)) {
            const { error } = await supabase
              .from('affirmation_unlocks')
              .insert({ user_id: user.id, day: dayOfMonth });

            if (!error) {
              unlockedSet.add(dayOfMonth);
              setUnlockedDays(new Set(unlockedSet));
            }
          }
        }
      } else {
        const sessionKey = `polar-bear-unlocked-${dayOfMonth}`;
        if (!sessionStorage.getItem(sessionKey)) {
          sessionStorage.setItem(sessionKey, 'true');
          setUnlockedDays(new Set([dayOfMonth]));
        } else {
          setUnlockedDays(new Set([dayOfMonth]));
        }
      }
    } catch (error) {
      console.error('Error loading affirmations:', error);
    } finally {
      setLoading(false);
    }
  };

  const isLocked = (day: number) => {
    if (day <= todayDay) return false;
    return !unlockedDays.has(day);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="border-b border-cyan-500/20 pb-6">
          <h1 className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 tracking-wider">
            The Vault
          </h1>
          <p className="text-gray-400 mt-2 tracking-wide">Daily Affirmations</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-500 text-lg">Loading your vault...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-cyan-500/20 pb-6">
        <h1 className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 tracking-wider">
          The Vault
        </h1>
        <p className="text-gray-400 mt-2 tracking-wide">Daily Affirmations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {affirmations.map((affirmation) => {
          const locked = isLocked(affirmation.day);
          const isToday = affirmation.day === todayDay;
          const isExpanded = expandedDay === affirmation.day;

          return (
            <div
              key={affirmation.day}
              onClick={() => !locked && setExpandedDay(isExpanded ? null : affirmation.day)}
              className="group relative"
            >
              {isExpanded && !locked ? (
                <AffirmationCard
                  day={affirmation.day}
                  content={affirmation.content}
                  isToday={isToday}
                  onClose={() => setExpandedDay(null)}
                />
              ) : (
                <div
                  className={`backdrop-blur-md border rounded-lg p-6 transition-all duration-300 cursor-pointer ${
                    locked
                      ? 'bg-gray-800/20 border-gray-600/30 cursor-not-allowed'
                      : isToday
                        ? 'bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/50 glow-pulse'
                        : 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-cyan-500/30 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm tracking-widest uppercase font-light text-gray-400 mb-2">
                        Day {affirmation.day}
                      </div>
                      <div
                        className={`text-xs leading-relaxed ${
                          locked ? 'text-gray-600' : 'text-gray-300'
                        }`}
                      >
                        {locked
                          ? 'Encrypted. Return tomorrow.'
                          : affirmation.content.substring(0, 60) + '...'}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {locked ? (
                        <div className="w-10 h-10 rounded-lg bg-gray-700/30 border border-gray-600/30 flex items-center justify-center">
                          <Lock className="w-5 h-5 text-gray-500" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
                          <Unlock className="w-5 h-5 text-cyan-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {isToday && !locked && (
                    <div className="mt-3 text-xs text-cyan-400 tracking-wider uppercase font-light">
                      Today's Affirmation
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
