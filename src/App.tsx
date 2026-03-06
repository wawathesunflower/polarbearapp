import { useState } from 'react';
import DestinyLoader from './components/DestinyLoader';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import TheVault from './components/sections/TheVault';
import TheGarden from './components/sections/TheGarden';
import Triumphs from './components/sections/Triumphs';
import PrayerCorner from './components/sections/PrayerCorner';
import Starfield from './components/Starfield';

type Section = 'vault' | 'garden' | 'triumphs' | 'prayer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>('vault');

  // Logic to calculate the current day based on first visit
  const [currentDay] = useState(() => {
    const savedStart = localStorage.getItem('polar_bear_start_date');
    if (!savedStart) {
      const today = new Date().toISOString();
      localStorage.setItem('polar_bear_start_date', today);
      return 1;
    }
    const startDate = new Date(savedStart);
    const today = new Date();
    const diff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  });

  if (isLoading) return <DestinyLoader onComplete={() => setIsLoading(false)} />;
  if (showLanding) return <LandingPage onEnter={() => setShowLanding(false)} />;

  const renderSection = () => {
    switch (activeSection) {
      case 'vault': return <TheVault currentDay={currentDay} />;
      case 'garden': return <TheGarden />;
      case 'triumphs': return <Triumphs />;
      case 'prayer': return <PrayerCorner />;
      default: return <TheVault currentDay={currentDay} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Starfield />
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="md:ml-64 relative z-10">
        <div className="mt-16 md:mt-0 max-w-6xl mx-auto px-4 md:px-8 py-8 min-h-screen">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default App;