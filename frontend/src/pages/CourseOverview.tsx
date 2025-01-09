import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Clock, Users, Star, Play } from "lucide-react";
import { CourseService, CourseDetails } from "../services/course";
import { CourseHeader } from "../components/courseOverview/CourseHeader";
import { InstructorCard } from "../components/courseOverview/InstructorCard";
import { CourseContent } from "../components/courseOverview/CourseContent";
import { ReviewSection } from "../components/courseOverview/ReviewSection";
import { toast } from "react-hot-toast";
import { EnrollmentService } from "../services/enrollment";
import { v4 as uuidv4 } from "uuid";

export function CourseOverview() {
  const { id: courseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCourseDetails();
  }, [courseId]);

  const loadCourseDetails = async () => {
    try {
      const details = await CourseService.getCourseDetails(courseId!);
      if (details) {
        setCourse(details);
      } else {
        toast.error("Course not found");
      }
    } catch (error) {
      toast.error("Error loading course details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartCourse = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking enroll button
    try {
      const id = uuidv4();
      console.log(id);
      const response = await EnrollmentService.enrollCourse(
        courseId as string,
        id as string
      );
      if (response.success) {
        toast.success("Successfully enrolled in course!");
        localStorage.setItem("currentEnrollmentId", id);

        navigate(`/course/${courseId}`);
      } else {
        toast.error(response.error?.message || "Failed to enroll in course");
      }
    } catch (error) {
      toast.error("An error occurred while enrolling in the course");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CourseHeader course={course} onBack={() => navigate("/dashboard")} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <InstructorCard instructor={course.instructor} />
            <CourseContent chapters={course.chapters} />
            <ReviewSection course={course!} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden relative group cursor-pointer">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    {course.rating.toFixed(1)}
                  </div>
                </div>

                <button
                  onClick={handleStartCourse}
                  className="w-full bg-blue-900 text-white py-4 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Start This Course</span>
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
