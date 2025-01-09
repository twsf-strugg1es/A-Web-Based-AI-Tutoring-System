import { ChapterProgress } from "../../services/chapterProgress";

import { toast } from "react-hot-toast";
import { YouTubePlayer } from "../video/YouTubePlayer";

interface VideoPlayerProps {
  videoUrl: string;
  handleVideoProgress: (progress: number, timeStamp: number) => Promise<void>;
  progress: ChapterProgress;
  currentVideoInfo:any;
  setCurrentVideoInfo:React.Dispatch<any>;
}

export function VideoPlayer({
  videoUrl,
  handleVideoProgress,
  progress,
  currentVideoInfo,
  setCurrentVideoInfo
}: VideoPlayerProps) {
  const handleError = (error: string) => {
    toast.error(error);
  };
  console.log("progress", progress);

  return (
    <div className="w-full h-full">
      <YouTubePlayer
      currentVideoInfo={currentVideoInfo}
        initialProgress={progress as ChapterProgress}
        handleVideoProgress={handleVideoProgress}
        videoUrl={videoUrl}
        onError={handleError}
        setCurrentVideoInfo={setCurrentVideoInfo}
      />
    </div>
  );
}
