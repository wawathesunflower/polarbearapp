import { useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AffirmationCard from './AffirmationCard';

interface Affirmation {
  id: string;
  day: number;
  content: string;
}

interface TheVaultProps {
  currentDay: number;
}

export default function TheVault({ currentDay }: TheVaultProps) {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [loading, setLoading] = useState(true); // This is now used below
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await supabase.from('affirmations').select('*').order('day');
        if (data) setAffirmations(data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false); // This updates the state to stop loading
      }
    };
    loadData();
  }, []);

  // CORRECTION: Using 'loading' to display a UI state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-400 animate-pulse">Loading your vault...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">The Vault</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {affirmations.map((a) => {
          const locked = a.day > currentDay;
          return (
            <div key={a.day} onClick={() => !locked && setExpandedDay(a.day)} className="cursor-pointer">
              {expandedDay === a.day && !locked ? (
                <AffirmationCard day={a.day} content={a.content} isToday={a.day === currentDay} onClose={() => setExpandedDay(null)} />
              ) : (
                <div className={`p-6 border rounded-lg ${locked ? 'bg-gray-800/20 border-gray-600/30' : 'bg-blue-900/30 border-cyan-500/30'}`}>
                  <div className="text-sm text-gray-400">Day {a.day}</div>
                  <div className="text-gray-300">{locked ? 'Encrypted. Return tomorrow.' : a.content.substring(0, 60) + '...'}</div>
                  {locked ? <Lock className="w-5 h-5 text-gray-500" /> : <Unlock className="w-5 h-5 text-cyan-400" />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}