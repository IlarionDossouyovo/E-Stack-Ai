import { Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white';
}

export default function Logo({ size = 'md', variant = 'default' }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: 'text-sm' },
    md: { icon: 32, text: 'text-lg' },
    lg: { icon: 40, text: 'text-xl' },
    xl: { icon: 56, text: 'text-2xl' },
  };

  const colors = variant === 'white' 
    ? 'from-pink-500 via-purple-500 to-indigo-500' 
    : 'from-pink-500 via-purple-500 to-indigo-500';

  return (
    <div className="flex items-center gap-2">
      <div className={`w-${sizes[size].icon} h-${sizes[size].icon} bg-gradient-to-br ${colors} rounded-xl flex items-center justify-center shadow-lg`}>
        <Sparkles className={`w-${sizes[size].icon - 8} h-${sizes[size].icon - 8} text-white`} />
      </div>
      <div className="flex flex-col">
        <span className={`${sizes[size].text} font-bold ${variant === 'white' ? 'text-white' : 'text-gray-900'}`}>
          ELECTRON
        </span>
        <span className={`text-xs ${variant === 'white' ? 'text-white/70' : 'text-gray-500'}`}>
          AI OS
        </span>
      </div>
    </div>
  );
}
