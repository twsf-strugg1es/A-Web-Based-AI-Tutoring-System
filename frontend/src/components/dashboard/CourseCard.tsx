import { motion } from "framer-motion";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Course } from "../../services/course";

interface Props {
  course: Course;
}

export function CourseCard({ course }: Props) {
  const navigate = useNavigate();

  const handleStartCourse = () => {
    navigate(`/courses/overview/${course.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
    >
      <div className="relative h-48">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-900">
          {course.level}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-400" />
            {course.rating.toFixed(1)}
          </div>
        </div>
        <button
          onClick={handleStartCourse}
          className="w-full bg-blue-900 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
        >
          Start Now <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </motion.div>
  );
}
