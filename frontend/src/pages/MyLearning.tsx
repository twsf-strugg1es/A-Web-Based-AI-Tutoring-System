import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
} from "lucide-react";
import { CourseService, Course } from "../services/course";
import { toast } from "react-hot-toast";

interface EnrolledCourse extends Course {
  chapters: {
    id: string;
    title: string;
    progress: number;
  }[];
  overallProgress: number;
}

export function MyLearning() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    loadEnrolledCourses();
  }, []);

  const loadEnrolledCourses = async () => {
    try {
      const response = await CourseService.getEnrolledCourses();
      setCourses(response.data || []);
    } catch (error) {
      toast.error("Failed to load enrolled courses");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCourseExpansion = (courseId: string) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  const filteredCourses = courses.filter((course) => {
    if (filter === "all") return true;
    if (filter === "in-progress") return course.overallProgress < 100;
    if (filter === "completed") return course.overallProgress === 100;
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)} // Navigates to the previous page
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-7 h-7 mr-0" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Courses</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No courses matching the selected filter
            </h2>
            <p className="text-gray-500">
              Adjust the filter or enroll in a course
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {course.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {course.duration}
                            </span>
                            {course.overallProgress === 100 && (
                              <span className="flex items-center text-green-600">
                                <Award className="w-4 h-4 mr-1" />
                                Completed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCourseExpansion(course.id)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      {expandedCourseId === course.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Overall Progress
                      </span>
                      <span className="text-sm text-gray-600">
                        {course.overallProgress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.overallProgress}%` }}
                        className="h-full bg-blue-600 rounded-full"
                      />
                    </div>
                  </div>

                  {expandedCourseId === course.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-6 space-y-4"
                    >
                      {course.chapters.map((chapter, index) => (
                        <div
                          key={chapter.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-900 rounded-full font-medium">
                              {index + 1}
                            </span>
                            <span className="font-medium text-gray-900">
                              {chapter.title}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-32">
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 rounded-full"
                                  style={{ width: `${chapter.progress}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {chapter.progress}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
