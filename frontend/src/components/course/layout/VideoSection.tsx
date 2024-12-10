import { Maximize2, Minimize2 } from 'lucide-react';
import { VideoPlayer } from '../VideoPlayer';

interface VideoSectionProps {
  isMaximized: boolean;
  onToggleMaximize: () => void;
}

export function VideoSection({ isMaximized, onToggleMaximize }: VideoSectionProps) {
  return (
    <div className={`relative ${isMaximized ? 'h-full' : 'h-[60vh]'}`}>
      <VideoPlayer />
      <button
        onClick={onToggleMaximize}
        className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
      >
        {isMaximized ? (
          <Minimize2 className="w-5 h-5" />
        ) : (
          <Maximize2 className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}