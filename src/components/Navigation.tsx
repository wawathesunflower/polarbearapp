import { useState } from 'react';
import { Archive, Sprout, Trophy, Heart, Menu, X } from 'lucide-react';

type Section = 'vault' | 'garden' | 'triumphs' | 'prayer';

interface NavigationProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const navItems = [
  { id: 'vault' as Section, label: 'The Vault', sublabel: 'Daily Affirmations', icon: Archive },
  { id: 'garden' as Section, label: 'The Garden', sublabel: 'Growth Streak', icon: Sprout },
  { id: 'triumphs' as Section, label: 'Triumphs', sublabel: 'Our Milestones', icon: Trophy },
  { id: 'prayer' as Section, label: 'The Prayer Corner', sublabel: 'Reflection', icon: Heart },
];

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (section: Section) => {
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-r border-cyan-500/20 z-40 flex-col">
        <div className="p-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white rotate-45" />
            </div>
            <div>
              <h2 className="text-lg font-light text-cyan-400 tracking-wider"><a href="/index.html">Polar Bear</a></h2>
              <p className="text-xs text-gray-500 tracking-wide">Version 2.0</p>
            </div>
          </div>
        </div>

        <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full group relative px-4 py-4 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                    : 'border border-transparent hover:border-cyan-500/30 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-r" />
                )}

                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg transition-colors ${
                    isActive ? 'bg-cyan-500/20' : 'bg-white/5 group-hover:bg-cyan-500/10'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-400'
                    }`} />
                  </div>

                  <div className="flex-1 text-left">
                    <div className={`text-sm font-light tracking-wide ${
                      isActive ? 'text-cyan-300' : 'text-gray-300 group-hover:text-cyan-400'
                    }`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 tracking-wider">
                      {item.sublabel}
                    </div>
                  </div>
                </div>

                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 animate-pulse" />
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-500/50 rounded-full blur-sm" />
                  </>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-cyan-500/20">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs text-gray-500 tracking-wider uppercase">System Active</span>
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-b from-gray-900/95 to-black/80 backdrop-blur-xl border-b border-cyan-500/20 z-40 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white rotate-45" />
          </div>
          <div>
            <h2 className="text-sm font-light text-cyan-400 tracking-wider">Polar Bear</h2>
            <p className="text-xs text-gray-600 tracking-wide">2.0</p>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-cyan-400" />
          ) : (
            <Menu className="w-6 h-6 text-cyan-400" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-black/90 backdrop-blur-xl z-30 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full px-4 py-4 rounded-lg transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/50'
                      : 'border border-gray-700/30 hover:border-cyan-500/30 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                    <div className="flex-1">
                      <div className={`text-sm font-light tracking-wide ${
                        isActive ? 'text-cyan-300' : 'text-gray-300'
                      }`}>
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-600">{item.sublabel}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
