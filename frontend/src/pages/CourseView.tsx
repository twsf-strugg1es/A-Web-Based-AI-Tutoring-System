import { useState } from 'react';
import { VideoSection } from '../components/course/layout/VideoSection';
import { TabNavigation, TabType } from '../components/course/layout/TabNavigation';
import { WhiteboardPanel } from '../components/course/layout/WhiteboardPanel';
import { CourseContent } from '../components/course/CourseContent';
import { CourseOverview } from '../components/course/CourseOverview';
import { CourseReviews } from '../components/course/CourseReviews';
import { CourseNotes } from '../components/course/CourseNotes';
import { AiHelp } from '../components/course/AiHelp';

export function CourseView() {
  const [isVideoMaximized, setIsVideoMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isWhiteboardPopup, setIsWhiteboardPopup] = useState(false);

  const handleWhiteboardClose = () => {
    setIsWhiteboardOpen(false);
    setIsWhiteboardPopup(false);
  };

  const handleWhiteboardMaximize = () => {
    setIsWhiteboardOpen(false);
    setIsWhiteboardPopup(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 ${isVideoMaximized ? 'h-screen' : ''}`}>
          <VideoSection 
            isMaximized={isVideoMaximized}
            onToggleMaximize={() => setIsVideoMaximized(!isVideoMaximized)}
          />

          {!isVideoMaximized && (
            <div className="p-6">
              <TabNavigation 
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              <div className="mt-6">
                {activeTab === 'overview' && <CourseOverview />}
                {activeTab === 'content' && <CourseContent />}
                {activeTab === 'notes' && <CourseNotes />}
                {activeTab === 'reviews' && <CourseReviews />}
                {activeTab === 'ai' && <AiHelp />}
              </div>
            </div>
          )}
        </div>

        <WhiteboardPanel 
          isOpen={isWhiteboardOpen || isWhiteboardPopup}
          onToggle={() => setIsWhiteboardOpen(!isWhiteboardOpen)}
          isPopup={isWhiteboardPopup}
          onClose={handleWhiteboardClose}
          onMaximize={handleWhiteboardMaximize}
        />
      </div>
    </div>
  );
}