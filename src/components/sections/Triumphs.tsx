import { useState } from 'react';
import { Star, Plus, X } from 'lucide-react';

interface Triumph {
  id: string;
  title: string;
  desc: string;
  date: string;
}

export default function Triumphs() {
  const [triumphs, setTriumphs] = useState<Triumph[]>(() => {
    const stored = localStorage.getItem('polar-bear-triumphs');
    if (stored) return JSON.parse(stored);
    return [
      { id: '1', title: 'First Steps', desc: 'Welcome to Polar Bear 2.0', date: new Date().toLocaleDateString() },
    ];
  });
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [celebratingId, setCelebratingId] = useState<string | null>(null);

  const addTriumph = () => {
    if (!newTitle.trim()) return;

    const triumph: Triumph = {
      id: Date.now().toString(),
      title: newTitle,
      desc: newDesc,
      date: new Date().toLocaleDateString(),
    };

    const updated = [triumph, ...triumphs];
    setTriumphs(updated);
    localStorage.setItem('polar-bear-triumphs', JSON.stringify(updated));
    setNewTitle('');
    setNewDesc('');
    setShowForm(false);
  };

  const celebrate = (id: string) => {
    setCelebratingId(id);
    setTimeout(() => setCelebratingId(null), 1500);
  };

  const removeTriumph = (id: string) => {
    const updated = triumphs.filter(t => t.id !== id);
    setTriumphs(updated);
    localStorage.setItem('polar-bear-triumphs', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-cyan-500/20 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 tracking-wider">
            Triumphs
          </h1>
          <p className="text-gray-400 mt-2 tracking-wide text-sm md:text-base">Our Milestones</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 px-4 py-3 md:py-2 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/40 rounded-lg text-cyan-300 hover:border-cyan-400/60 transition-all text-xs md:text-sm tracking-wider uppercase font-light"
        >
          <Plus className="w-4 h-4" />
          Add Triumph
        </button>
      </div>

      {showForm && (
        <div className="backdrop-blur-md bg-gradient-to-br from-cyan-900/40 to-blue-900/30 border border-cyan-500/30 rounded-xl p-6 md:p-8 space-y-4">
          <h3 className="text-base md:text-lg font-light text-cyan-300 tracking-wider">Record a New Triumph</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Triumph title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-black/30 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 transition-all text-sm"
            />
            <textarea
              placeholder="Brief description..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              rows={2}
              className="w-full bg-black/30 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 transition-all resize-none text-sm"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={addTriumph}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-600/40 to-blue-600/40 border border-cyan-500/50 rounded-lg text-cyan-300 hover:border-cyan-400/70 transition-all font-light tracking-wider uppercase text-xs md:text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setNewTitle('');
                  setNewDesc('');
                }}
                className="flex-1 py-3 bg-gray-800/30 border border-gray-600/30 rounded-lg text-gray-400 hover:border-gray-500/50 transition-all font-light tracking-wider uppercase text-xs md:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {triumphs.map((triumph) => (
          <div
            key={triumph.id}
            className={`backdrop-blur-md border rounded-lg p-6 transition-all relative overflow-hidden ${
              celebratingId === triumph.id
                ? 'bg-gradient-to-br from-yellow-900/40 to-orange-900/30 border-yellow-500/40'
                : 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
            }`}
          >
            {celebratingId === triumph.id && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
              </>
            )}

            <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex items-start gap-3 sm:gap-4 flex-1">
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-lg border border-cyan-500/40 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 sm:w-7 h-6 sm:h-7 text-cyan-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-light tracking-wide text-cyan-300 break-words">{triumph.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400 tracking-wide break-words">{triumph.desc}</p>
                  <p className="text-xs text-gray-600 mt-2">{triumph.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => celebrate(triumph.id)}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-3 md:py-2 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/40 rounded-lg text-yellow-300 hover:border-yellow-400/60 transition-all text-xs tracking-widest uppercase font-light"
                >
                  Celebrate
                </button>
                <button
                  onClick={() => removeTriumph(triumph.id)}
                  className="px-3 py-3 md:py-2 bg-gray-800/30 border border-gray-600/30 rounded-lg text-gray-400 hover:border-gray-500/50 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {triumphs.length === 0 && (
        <div className="backdrop-blur-md bg-gray-800/20 border border-gray-700/30 rounded-lg p-12 text-center">
          <Star className="w-12 h-12 text-gray-600 mx-auto mb-4 opacity-50" />
          <p className="text-gray-500 tracking-wide">No triumphs recorded yet. Start celebrating your milestones!</p>
        </div>
      )}
    </div>
  );
}
