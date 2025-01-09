import { User } from 'lucide-react';

interface InstructorCardProps {
  instructor: string;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Your Instructor</h2>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-gray-400" />
        </div>
        <div>
          <h3 className="font-medium text-lg">{instructor}</h3>
          <p className="text-gray-500">Course Instructor</p>
        </div>
      </div>
    </div>
  );
}