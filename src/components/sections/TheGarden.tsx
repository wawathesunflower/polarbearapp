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
    loadData();
    checkAnniversary();
  }, []);

  useEffect(() => {
    const timer = setInterval(updateChannelStatus, 1000);
    return () => clearInterval(timer);
  }, [data.lastChanneled]);

  const loadData = () => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('polar-bear-garden');

    if (stored) {
      const parsed = JSON.parse(stored);
      const lastDate = new Date(parsed.lastChanneled).toDateString();

      if (lastDate === today) {
        setCanChannel(false);
        updateChannelStatus();
      } else {
        setData({ ...parsed, lastChanneled: '' });
        setCanChannel(true);
      }
    } else {
      setCanChannel(true);
    }
  };

  const checkAnniversary = () => {
    const today = new Date();
    if (today.getDate() === 1) {
      const stored = localStorage.getItem('polar-bear-garden');
      if (!stored || new Date(stored).getMonth() !== today.getMonth()) {
        setShowAnniversaryAnimation(true);
        setTimeout(() => setShowAnniversaryAnimation(false), 3000);
      }
    }
  };

  const updateChannelStatus = () => {
    const stored = localStorage.getItem('polar-bear-garden');
    if (!stored) return;

    const lastChanneled = new Date(stored);
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
    updateChannelStatus();
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

  return (
    <div className="space-y-8">
      {showAnniversaryAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-pulse">
            <div className="text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-cyan-400 to-blue-400 tracking-wider text-center">
              Anniversary Celebration
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse" />
        </div>
      )}

      <div className="border-b border-cyan-500/20 pb-6">
        <h1 className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 tracking-wider">
          The Garden
        </h1>
        <p className="text-gray-400 mt-2 tracking-wide">Tree of Silver Wings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-2 space-y-6 md:space-y-8">
          <div className="backdrop-blur-md bg-gradient-to-br from-cyan-900/30 to-teal-900/20 border border-cyan-500/30 rounded-xl p-6 md:p-12 shadow-xl flex justify-center overflow-x-auto">
            <Tree stage={data.treeStage} />
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-2xl font-light text-cyan-300 tracking-wider">
              {getStageLabel(data.treeStage as TreeStage)}
            </h2>
            <p className="text-gray-400 text-sm">{getStageDescription(data.treeStage as TreeStage)}</p>
            <div className="text-xs text-gray-500 tracking-widest uppercase pt-2">
              Stage {data.treeStage + 1} of 5
            </div>
          </div>

          <div className="backdrop-blur-md bg-gray-800/20 border border-cyan-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm tracking-widest uppercase text-gray-400">Growth Progress</span>
              <span className="text-sm text-cyan-400">
                {(data.streak % 6) || 6} / 6 days
              </span>
            </div>
            <div className="h-2 bg-gray-900/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${((data.streak % 6) || 6) * (100 / 6)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="backdrop-blur-md bg-gradient-to-br from-cyan-900/40 to-blue-900/30 border border-cyan-500/40 rounded-xl p-8 shadow-xl text-center space-y-6">
            <div>
              <div className="text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                {data.streak}
              </div>
              <p className="text-gray-400 text-sm mt-2 tracking-wider uppercase">Day Streak</p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

            <button
              onClick={canChannel ? channelLight : undefined}
              disabled={!canChannel}
              className={`w-full py-3 md:py-4 rounded-lg font-light tracking-wider uppercase text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                canChannel
                  ? 'bg-gradient-to-r from-cyan-600/40 to-teal-600/40 border border-cyan-500/50 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/20 text-cyan-300 cursor-pointer'
                  : 'bg-gray-800/30 border border-gray-600/30 text-gray-600 cursor-not-allowed'
              }`}
            >
              <Zap className="w-4 h-4" />
              Channel Light
            </button>

            {!canChannel && nextChannelTime && (
              <div className="text-xs text-gray-500 tracking-widest">
                Available in {nextChannelTime}
              </div>
            )}

            {showAnniversaryAnimation && (
              <button
                onClick={resetForAnniversary}
                className="w-full py-3 bg-gradient-to-r from-yellow-600/40 to-orange-600/40 border border-yellow-500/50 rounded-lg text-yellow-300 text-sm tracking-wider uppercase font-light hover:border-yellow-400/70 transition-all"
              >
                Celebrate & Reset
              </button>
            )}
          </div>

          <div className="backdrop-blur-md bg-gray-800/20 border border-cyan-500/20 rounded-lg p-6 space-y-4">
            <h3 className="text-sm tracking-widest uppercase text-gray-400">Growth Path</h3>
            <div className="space-y-2 text-xs text-gray-500">
              <div>Stage 1: 6 days</div>
              <div>Stage 2: 12 days</div>
              <div>Stage 3: 18 days</div>
              <div>Stage 4: 24 days</div>
              <div>Stage 5: 30+ days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
