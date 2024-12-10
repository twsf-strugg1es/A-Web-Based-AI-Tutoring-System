import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { CourseDetails } from './CourseDetails';
import { CourseImage } from './CourseImage';
import { ChapterList } from './ChapterList';
import { CoursePricing } from './CoursePricing';
import { ResourceList } from './ResourceList';
import { Sidebar } from './Sidebar';
import { PublishModal } from './PublishModal';
import { useSetupProgress } from './useSetupProgress';

export function CourseSetup() {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const navigate = useNavigate();
  const { progress, totalSteps, isComplete, updateProgress } = useSetupProgress();

  const handlePublish = () => {
    if (isComplete) {
      setIsPublishModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1">
        <Header 
          progress={progress}
          totalSteps={totalSteps}
          isComplete={isComplete}
          onPublish={handlePublish}
        />

        <main className="p-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </button>

          <div className="space-y-8">
            <CourseDetails onUpdate={() => updateProgress('details')} />
            <CourseImage onUpdate={() => updateProgress('image')} />
            <ChapterList onUpdate={() => updateProgress('chapters')} />
            <CoursePricing onUpdate={() => updateProgress('pricing')} />
            <ResourceList onUpdate={() => updateProgress('resources')} />
          </div>
        </main>
      </div>

      <PublishModal 
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />
    </div>
  );
}