interface TreeProps {
  stage: 0 | 1 | 2 | 3 | 4;
}

export default function Tree({ stage }: TreeProps) {
  const getTreeSVG = () => {
    switch (stage) {
      case 0:
        return (
          <svg viewBox="0 0 200 200" className="w-32 h-32">
            <defs>
              <radialGradient id="seedGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="12" fill="url(#seedGlow)" className="animate-pulse" />
            <circle cx="100" cy="100" r="12" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
          </svg>
        );

      case 1:
        return (
          <svg viewBox="0 0 200 200" className="w-40 h-40">
            <defs>
              <radialGradient id="sproutGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.2" />
              </radialGradient>
            </defs>
            <rect x="95" y="120" width="10" height="40" fill="#0f766e" />
            <ellipse cx="80" cy="110" rx="20" ry="30" fill="url(#sproutGlow)" opacity="0.8" />
            <ellipse cx="120" cy="110" rx="20" ry="30" fill="url(#sproutGlow)" opacity="0.8" />
            <ellipse cx="100" cy="80" rx="18" ry="28" fill="#06b6d4" opacity="0.9" />
            <circle cx="100" cy="100" r="8" fill="#22d3ee" className="animate-pulse" />
          </svg>
        );

      case 2:
        return (
          <svg viewBox="0 0 200 200" className="w-48 h-48">
            <defs>
              <radialGradient id="saplingGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.15" />
              </radialGradient>
            </defs>
            <rect x="95" y="130" width="10" height="50" fill="#134e4a" />
            <g opacity="0.85">
              <ellipse cx="70" cy="110" rx="25" ry="35" fill="url(#saplingGlow)" />
              <ellipse cx="130" cy="110" rx="25" ry="35" fill="url(#saplingGlow)" />
              <ellipse cx="85" cy="75" rx="20" ry="30" fill="url(#saplingGlow)" />
              <ellipse cx="115" cy="75" rx="20" ry="30" fill="url(#saplingGlow)" />
              <ellipse cx="100" cy="50" rx="22" ry="32" fill="#06b6d4" />
            </g>
            <circle cx="100" cy="100" r="10" fill="#22d3ee" className="animate-pulse" />
          </svg>
        );

      case 3:
        return (
          <svg viewBox="0 0 200 200" className="w-56 h-56">
            <defs>
              <radialGradient id="youngGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
              </radialGradient>
            </defs>
            <rect x="95" y="140" width="10" height="50" fill="#165d6f" />
            <g opacity="0.9">
              <ellipse cx="60" cy="110" rx="30" ry="40" fill="url(#youngGlow)" />
              <ellipse cx="140" cy="110" rx="30" ry="40" fill="url(#youngGlow)" />
              <ellipse cx="75" cy="70" rx="25" ry="35" fill="url(#youngGlow)" />
              <ellipse cx="125" cy="70" rx="25" ry="35" fill="url(#youngGlow)" />
              <ellipse cx="100" cy="35" rx="28" ry="38" fill="#06b6d4" />
              <ellipse cx="90" cy="45" rx="15" ry="20" fill="url(#youngGlow)" opacity="0.7" />
              <ellipse cx="110" cy="45" rx="15" ry="20" fill="url(#youngGlow)" opacity="0.7" />
            </g>
            <circle cx="100" cy="100" r="12" fill="#22d3ee" className="animate-pulse" />
          </svg>
        );

      case 4:
        return (
          <svg viewBox="0 0 200 200" className="w-64 h-64">
            <defs>
              <radialGradient id="radiantGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.08" />
              </radialGradient>
              <filter id="radiantFilter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>
            <rect x="95" y="150" width="10" height="50" fill="#164e63" />
            <g opacity="0.95">
              <ellipse cx="55" cy="110" rx="35" ry="45" fill="url(#radiantGlow)" />
              <ellipse cx="145" cy="110" rx="35" ry="45" fill="url(#radiantGlow)" />
              <ellipse cx="70" cy="65" rx="28" ry="38" fill="url(#radiantGlow)" />
              <ellipse cx="130" cy="65" rx="28" ry="38" fill="url(#radiantGlow)" />
              <ellipse cx="100" cy="30" rx="32" ry="42" fill="#06b6d4" />
              <ellipse cx="85" cy="45" rx="18" ry="25" fill="url(#radiantGlow)" opacity="0.8" />
              <ellipse cx="115" cy="45" rx="18" ry="25" fill="url(#radiantGlow)" opacity="0.8" />
              <ellipse cx="100" cy="65" rx="15" ry="20" fill="url(#radiantGlow)" opacity="0.7" />
            </g>
            <circle cx="100" cy="100" r="14" fill="#22d3ee" className="animate-pulse" />
            <g filter="url(#radiantFilter)" opacity="0.6">
              <circle cx="100" cy="100" r="40" fill="none" stroke="#06b6d4" strokeWidth="0.5" className="animate-pulse" />
              <circle cx="100" cy="100" r="55" fill="none" stroke="#0891b2" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
            </g>
          </svg>
        );

      default:
        return null;
    }
  };

  return <div className="flex justify-center items-center">{getTreeSVG()}</div>;
}
