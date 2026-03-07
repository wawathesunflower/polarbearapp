import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import Tree from './Tree';

type TreeStage = 0 | 1 | 2 | 3 | 4;

interface GardenData {
  streak: number;
  lastChanneled: string;
  treeStage: TreeStage;
}

const getStageLabel = (stage: TreeStage) => {
  const labels = ['Glowing Seed', 'Tender Sprout', 'Young Sapling', 'Flourishing Tree', 'Radiant Silver Wings'];
  return labels[stage];
};

const getStageDescription = (stage: TreeStage) => {
  const descriptions = [
    'A seed waiting to grow',
    'Beginning to reach toward light',
    'Growing stronger each day',
    'Nearly in full bloom',
    'Fully radiant with silver wings',
  ];
  return descriptions[stage];
};

export default function TheGarden() {
  const [data, setData] = useState<GardenData>({
    streak: 0,
    lastChanneled: '',
    treeStage: 0,
  });
  const [canChannel, setCanChannel] = useState(true);
  const [nextChannelTime, setNextChannelTime] = useState<string>('');
  const [showAnniversaryAnimation, setShowAnniversaryAnimation] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('polar-bear-garden');
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed);
      
      const today = new Date().toDateString();
      if (new Date(parsed.lastChanneled).toDateString() === today) {
        setCanChannel(false);
      } else {
        setCanChannel(true);
      }
    }
    checkAnniversary();
  }, []);  

  
  useEffect(() => {
    const timer = setInterval(updateChannelStatus, 1000);
    return () => clearInterval(timer);
  }, [data.lastChanneled]);

  const checkAnniversary = () => {
    const today = new Date();
    if (today.getDate() === 1) {
      const stored = localStorage.getItem('polar-bear-garden');
      if (!stored || new Date(JSON.parse(stored).lastChanneled).getMonth() !== today.getMonth()) {
        setShowAnniversaryAnimation(true);
      }
    }
  };

  const updateChannelStatus = () => {
    const stored = localStorage.getItem('polar-bear-garden');
    if (!stored) return;

    const lastChanneled = new Date(JSON.parse(stored).lastChanneled);
    const now = new Date();
    const tomorrow = new Date(lastChanneled);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const diff = tomorrow.getTime() - now.getTime();
    if (diff > 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setNextChannelTime(`${hours}h ${minutes}m ${seconds}s`);
    } else {
      setCanChannel(true);
      setNextChannelTime('');
    }
  };

  const channelLight = () => {
    const today = new Date().toDateString();
    const currentStreak = data.streak + 1;
    const newStage = (Math.min(Math.floor((currentStreak - 1) / 6), 4)) as TreeStage;

    const newData: GardenData = {
      streak: currentStreak,
      lastChanneled: today,
      treeStage: newStage,
    };

    localStorage.setItem('polar-bear-garden', JSON.stringify(newData));
    setData(newData);
    setCanChannel(false);
  };

  const resetForAnniversary = () => {
    const newData: GardenData = {
      streak: 1,
      lastChanneled: new Date().toDateString(),
      treeStage: 0,
    };
    localStorage.setItem('polar-bear-garden', JSON.stringify(newData));
    setData(newData);
    setCanChannel(false);
    setShowAnniversaryAnimation(false);
  };

  const displayTotal = Math.max(6, Math.ceil((data.streak || 1) / 6) * 6);
  const displayCurrent = data.streak === 0 ? 0 : (data.streak % 6 === 0 ? 6 : data.streak % 6);

  return (
    <div className="space-y-8">
      {/* Anniversary Popup */}
      {showAnniversaryAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="text-center p-8">
            <h2 className="text-4xl text-yellow-400 mb-4">Anniversary Celebration</h2>
            <button 
              onClick={resetForAnniversary}
              className="px-6 py-2 bg-yellow-600 text-white rounded"
            >
              Celebrate & Reset
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Tree */}
        <div className="md:col-span-2 space-y-8">
          <div className="border border-cyan-500/30 rounded-xl p-12 flex justify-center">
            <Tree stage={data.treeStage} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl text-cyan-300">{getStageLabel(data.treeStage)}</h2>
            <p className="text-gray-400">{getStageDescription(data.treeStage)}</p>
          </div>

          {/* GROWTH PROGRESS BAR */}
          <div className="backdrop-blur-md bg-gray-800/20 border border-cyan-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm tracking-widest uppercase text-gray-400">Growth Progress</span>
              <span className="text-sm text-cyan-400">
                {displayCurrent} / {displayTotal} days
              </span>
            </div>
            <div className="h-2 bg-gray-900/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${(displayCurrent / displayTotal) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Controls */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/30 border border-cyan-500/40 rounded-xl p-8 text-center">
            <div className="text-5xl text-cyan-300">{data.streak}</div>
            <p className="text-gray-400 uppercase text-sm">Day Streak</p>

            <button
              onClick={channelLight}
              disabled={!canChannel}
              className={`w-full mt-6 py-4 rounded-lg ${canChannel ? 'bg-cyan-600/40 text-cyan-300' : 'bg-gray-800 text-gray-600'}`}
            >
              <Zap className="inline w-4 h-4 mr-2" />
              {canChannel ? "Channel Light" : "Channeling Complete"}
            </button>

            {!canChannel && (
              <div className="text-xs text-gray-500 mt-2">Available in {nextChannelTime}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}