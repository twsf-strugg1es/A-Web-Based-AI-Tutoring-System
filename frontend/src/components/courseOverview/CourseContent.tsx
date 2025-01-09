import { ChevronRight } from 'lucide-react';
import { ChapterDetails } from '../../services/course';

interface CourseContentProps {
  chapters: ChapterDetails[];
}

export function CourseContent({ chapters }: CourseContentProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Course Content</h2>
      <div className="space-y-4">
        {chapters.map((chapter, index) => (
          <div 
            key={chapter.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-900 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">Chapter {index + 1}</span>
                <h3 className="font-medium">{chapter.title}</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-900 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}