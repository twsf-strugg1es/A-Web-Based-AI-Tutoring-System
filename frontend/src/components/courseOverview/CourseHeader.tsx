import { ChevronLeft } from 'lucide-react';
import { CourseDetails } from '../../services/course';

interface CourseHeaderProps {
  course: CourseDetails;
  onBack: () => void;
}

export function CourseHeader({ course, onBack }: CourseHeaderProps) {
  return (
    <div className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={onBack}
          className="flex items-center text-blue-100 hover:text-white mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-xl text-blue-100 max-w-3xl">{course.description}</p>
      </div>
    </div>
  );
}