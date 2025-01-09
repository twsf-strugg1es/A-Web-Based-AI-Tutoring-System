import { Maximize2, Minimize2 } from "lucide-react";
import { VideoPlayer } from "../VideoPlayer";
import { ChapterProgress } from "../../../services/chapterProgress";


interface VideoSectionProps {
  isMaximized: boolean;
  onToggleMaximize: () => void;
  link: string;
  handleVideoProgress: (progress: number,timeStamp:number) => Promise<void>;
  progress:ChapterProgress;
  currentVideoInfo:any;
  setCurrentVideoInfo: React.Dispatch<any>
}

export function VideoSection({
  isMaximized,
  onToggleMaximize,
  link,
  handleVideoProgress,
  progress,currentVideoInfo,
  setCurrentVideoInfo
}: VideoSectionProps) {
  return (
    <div className={`relative ${isMaximized ? "h-full" : "h-[60vh]"}`}>
      <VideoPlayer videoUrl={link} handleVideoProgress={handleVideoProgress} progress={progress} currentVideoInfo={currentVideoInfo} setCurrentVideoInfo={setCurrentVideoInfo}/>

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
