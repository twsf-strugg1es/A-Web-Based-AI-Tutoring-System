import { useEffect, useRef, useState } from "react";
import { VideoControls } from "./VideoControls";
import { VideoProgress } from "./VideoProgress";
import { getYouTubeVideoId } from "../../utils/videoUtils";
import { ChapterProgress } from "../../services/chapterProgress";

interface YouTubePlayerProps {
  initialProgress: ChapterProgress;
  videoUrl: string;
  onError?: (error: string) => void;
  onProgressUpdate?: (progress: number) => void;
  handleVideoProgress: (progress: number, timeStamp: number) => Promise<void>;
  currentVideoInfo: any;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YouTubePlayer({
  initialProgress,
  videoUrl,
  onError,
  onProgressUpdate,
  handleVideoProgress,
  currentVideoInfo,
  setCurrentVideoInfo
}: YouTubePlayerProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<number>();
  const initialSeekDone = useRef(false);
  const apiLoaded = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [highestProgress, setHighestProgress] = useState(
    initialProgress?.progress_video || 0
  );

  // Load YouTube API
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (
        !apiLoaded.current &&
        !document.querySelector('script[src*="youtube.com/iframe_api"]')
      ) {
        console.log("Loading YouTube API...");
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        apiLoaded.current = true;
      }
    };

    if (!window.YT) {
      loadYouTubeAPI();
      window.onYouTubeIframeAPIReady = () => {
        console.log("YouTube API Ready");
        initializePlayer();
      };
    } else {
      console.log("YouTube API already loaded");
      initializePlayer();
    }

    return () => {
      cleanup();
    };
  }, [videoUrl]);

  const cleanup = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
    }
    initialSeekDone.current = false;
  };

  const initializePlayer = () => {
    console.log("Initializing player...");
    console.log("Initial timestamp:", initialProgress?.timeStamp);

    const videoId = getYouTubeVideoId(videoUrl);
    if (!videoId) {
      console.error("Invalid YouTube URL");
      onError?.("Invalid YouTube URL");
      return;
    }

    cleanup();

    const startTime = initialProgress?.timeStamp
      ? Math.floor(initialProgress.timeStamp)
      : 0;

    console.log("Setting start time to:", startTime);

    try {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          origin: window.location.origin,
          start: startTime,
        },
        events: {
          onReady: (event: any) => {
            console.log("Player ready");
            setIsReady(true);
            const duration = event.target.getDuration();
            setDuration(duration);

            // Ensure we're at the correct timestamp
            if (initialProgress?.timeStamp && !initialSeekDone.current) {
              console.log("Seeking to timestamp:", initialProgress.timeStamp);
              event.target.seekTo(initialProgress.timeStamp, true);
              setCurrentTime(initialProgress.timeStamp);
              initialSeekDone.current = true;
            }
          },
          onStateChange: (event: any) => {
            const newState = event.data;
            console.log("Player state changed:", newState);
            setIsPlaying(newState === window.YT.PlayerState.PLAYING);

            // Track progress when video ends
            if (newState === window.YT.PlayerState.ENDED) {
              handleVideoProgress(1, duration);
            }

            // Additional check for timestamp after state changes
            if (
              newState === window.YT.PlayerState.PLAYING &&
              initialProgress?.timeStamp &&
              !initialSeekDone.current
            ) {
              console.log("Additional seek attempt");
              event.target.seekTo(initialProgress.timeStamp, true);
              setCurrentTime(initialProgress.timeStamp);
              initialSeekDone.current = true;
            }
          },
          onError: (error: any) => {
            console.error("YouTube player error:", error);
            onError?.("Error loading video");
          },
        },
      });
    } catch (error) {
      console.error("Error initializing YouTube player:", error);
      onError?.("Error initializing video player");
    }
  };

  // Progress tracking
  useEffect(() => {
    if (isPlaying && playerRef.current) {
      progressInterval.current = window.setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          const progress = Math.round(currentTime / duration);
          setCurrentVideoInfo({
            currentTime,
            duration
          })

          setCurrentTime(currentTime);

          if (progress > highestProgress) {
            setHighestProgress(progress);
            updateProgress(progress);
          }
        }
      }, 1000);
    } else {
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, highestProgress]);

  const updateProgress = (progress: number) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      handleVideoProgress(progress, currentTime);
      onProgressUpdate?.(progress);
    }
  };

  const handlePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const handleSeek = (time: number) => {
    if (playerRef.current) {
      console.log("Seeking to:", time);
      playerRef.current.seekTo(time, true);
      setCurrentTime(time);
      setCurrentVideoInfo((prev)=>({
        ...prev,
        currentTime:time,
        
      }))

      // Calculate and update progress after seeking
      const progress = Math.round(time / duration);
      if (progress > highestProgress) {
        setHighestProgress(progress);
        updateProgress(progress);
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {isReady && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <VideoProgress
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            handleVideoProgress={handleVideoProgress}
          />
          <VideoControls
            isPlaying={isPlaying}
            volume={volume}
            isMuted={isMuted}
            currentTime={currentTime}
            duration={duration}
            onPlay={handlePlay}
            onVolumeChange={handleVolumeChange}
            onMute={handleMute}
          />
        </div>
      )}
    </div>
  );
}
