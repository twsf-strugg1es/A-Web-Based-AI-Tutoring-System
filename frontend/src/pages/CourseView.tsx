import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { VideoSection } from "../components/course/layout/VideoSection";
import {
  TabNavigation,
  TabType,
} from "../components/course/layout/TabNavigation";
import { WhiteboardPanel } from "../components/course/layout/WhiteboardPanel";
import { CourseContent } from "../components/course/CourseContent";
import { CourseReviews } from "../components/course/CourseReviews";
import { CourseNotes } from "../components/course/CourseNotes";
import AiHelp from "../components/course/ai-help/AiHelpComponent";
import { CourseService, CourseDetails } from "../services/course";
import CourseViewNavbar from "../components/course/CourseViewNavbar";
import { useChat } from "../components/course/ai-help/hooks/useChat";
import AiMcq from "../components/course/AiMcq";
<<<<<<< Updated upstream
=======
import { useChapterProgress } from "../hooks/useChapterProgress";
import {
  ChapterProgress,
  ChapterProgressService,
} from "../services/chapterProgress";
>>>>>>> Stashed changes

export function CourseView() {
  const { id: courseId } = useParams<{ id: string }>();
  const [isVideoMaximized, setIsVideoMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("content");
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isWhiteboardPopup, setIsWhiteboardPopup] = useState(false);
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );
  const [isCourseLoading, setIsCourseLoading] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
<<<<<<< Updated upstream
  const { messages, isTyping, sendMessage } = useChat();
=======
  const [prevChapterId, setPrevChapterId] = useState<string | null>(null);
  const { messages, isTyping, sendMessage } = useChat();
  const [enrollmentId, setEnrollmentId] = useState<string>("");
  const [currentVideoInfo, setCurrentVideoInfo] = useState<any>({
    duration: 0,
    currentTime: 0,
  });
>>>>>>> Stashed changes

  const currentChapter = courseDetails?.chapters[currentChapterIndex];
  const {
    progress,
    isLoading: isProgressLoading,
    updateVideoProgress,
    updateMcqProgress,
  } = useChapterProgress(
    courseId as string,
    currentChapter?.id || "",
    enrollmentId
  );

  // Fetch course details
  useEffect(() => {
    if (courseId) {
      setEnrollmentId(localStorage.getItem("currentEnrollmentId") as string);
      loadCourseDetails();
    }
  }, [courseId]);

  // Track previous chapter ID to control rendering
  useEffect(() => {
    if (progress?.chapterId && progress.chapterId !== prevChapterId) {
      setPrevChapterId(progress.chapterId);
      setCurrentChapterIndex(
        progress.lastChapterIndex !== null ? progress.lastChapterIndex : 0
      );
    }
  }, [progress?.chapterId, prevChapterId]);

  // Load course details
  const loadCourseDetails = async () => {
    try {
      const details = await CourseService.getCourseDetails(courseId as string);
      if (details) {
        setCourseDetails(details);
      } else {
        toast.error("Course not found");
      }
    } catch (error) {
      toast.error("Error loading course details");
    } finally {
      setIsCourseLoading(false);
    }
  };

  const handleVideoProgress = async (progress: number, timeStamp: number) => {
    if (courseId && currentChapter) {
      await updateVideoProgress(progress, timeStamp);
    }
  };

  const handleMcqComplete = async (score: number) => {
    if (courseId && currentChapter) {
      await updateMcqProgress(score);
    }
  };

  const handleChapterChange = async (newChapterIndex: number) => {
    if (newChapterIndex !== currentChapterIndex) {
      const percent = currentVideoInfo.currentTime / currentVideoInfo.duration;
      await updateVideoProgress(percent, currentVideoInfo.currentTime);
      console.log("Chapter changed", percent, currentVideoInfo.currentTime);
      setCurrentChapterIndex(newChapterIndex);

      await ChapterProgressService.updateLastAccChapIdx(
        newChapterIndex,
        localStorage.getItem("currentEnrollmentId") as string
      );
    }
  };

  // Loading placeholders
  if (isCourseLoading || isProgressLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!courseDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Course not found</div>
      </div>
    );
  }

<<<<<<< Updated upstream
  const currentChapter = courseDetails.chapters[currentChapterIndex];
  const handleChapterIdxChange = (index: number) => {
    setCurrentChapterIndex(index);
    // setMessages([
    //   {
    //     id: "1",
    //     content: `Anything you need for this ${courseDetails.chapters[index].title}?`,
    //     sender: "ai",
    //     timestamp: new Date(),
    //   },
    // ]);
  };

=======
>>>>>>> Stashed changes
  return (
    <div className="min-h-screen bg-gray-50">
      <CourseViewNavbar
        courseTitle={courseDetails.title}
        currentVideoInfo={currentVideoInfo}
        handleVideoProgress={handleVideoProgress}
      />
      <div className="flex">
        <div className={`flex-1 ${isVideoMaximized ? "h-screen" : ""}`}>
          {/* Only render VideoSection when the progress chapterId matches the current chapter */}
          {progress?.chapterId === currentChapter?.id && (
            <VideoSection
              key={currentChapterIndex}
              isMaximized={isVideoMaximized}
              onToggleMaximize={() => setIsVideoMaximized(!isVideoMaximized)}
              link={currentChapter?.videoLink || ""}
              handleVideoProgress={handleVideoProgress}
              progress={progress as ChapterProgress}
              currentVideoInfo={currentVideoInfo}
              setCurrentVideoInfo={setCurrentVideoInfo}
            />
          )}

          {!isVideoMaximized && (
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {currentChapter?.title}
              </h1>

              <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="mt-6">
                {activeTab === "content" && (
                  <CourseContent
                    chapters={courseDetails.chapters}
                    currentChapterIndex={currentChapterIndex}
                    onChapterSelect={handleChapterChange}
                  />
                )}
                {activeTab === "notes" && currentChapter && (
                  <CourseNotes
                    courseChapterText={currentChapter.textNote || ""}
                  />
                )}
<<<<<<< Updated upstream
                {activeTab === "reviews" && <CourseReviews />}
                {activeTab === "MCQ" && <AiMcq 
                chapterText={
                  courseDetails.chapters[currentChapterIndex]
                    .textNote as string
                }
                />}
                {activeTab === "ai" && (
=======
                {activeTab === "reviews" && (
                  <CourseReviews courseId={courseId as string} />
                )}
                {activeTab === "MCQ" && currentChapter && (
                  <AiMcq
                    chapterText={currentChapter.textNote || ""}
                    handleMcqComplete={handleMcqComplete}
                  />
                )}
                {activeTab === "ai" && currentChapter && (
>>>>>>> Stashed changes
                  <AiHelp
                    key={currentChapterIndex}
                    messages={messages}
                    isTyping={isTyping}
                    sendMessage={sendMessage}
                    courseChapterText={currentChapter.textNote || ""}
                  />
                )}
                
              </div>
            </div>
          )}
        </div>

        <WhiteboardPanel
          isOpen={isWhiteboardOpen}
          onToggle={() => setIsWhiteboardOpen(!isWhiteboardOpen)}
          onClose={() => setIsWhiteboardOpen(false)}
          courseId={courseId as string}
          chapterId={currentChapter?.id || ""}
        />
      </div>
    </div>
  );
}
