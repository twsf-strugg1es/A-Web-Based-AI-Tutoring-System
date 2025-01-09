import { useEffect, useState } from "react";
import { Clock, Users, BarChart, Award, Star } from "lucide-react";
import {
  CourseDetails,
  CourseService,
  CourseRatingsDistribution,
} from "../../services/course";
import { toast } from "react-hot-toast";

interface ReviewSectionProps {
  course: {
    id: string;
    duration: string;
    level: string;
    // other relevant properties
  };
}

export function ReviewSection({ course }: ReviewSectionProps) {
  const [ratings, setRatings] = useState<CourseRatingsDistribution>({
    totalRatings: 0,
    averageRating: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
  const [userRating, setUserRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadRatings();
  }, [course.id]);

  const loadRatings = async () => {
    try {
      const ratingsData = await CourseService.getCourseRatings(course.id);
      setRatings(ratingsData);
    } catch (error) {
      console.error("Error loading ratings:", error);
    }
  };

  const handleRatingSubmit = async (rating: number) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await CourseService.submitRating(course.id, rating);
      setUserRating(rating);
      await loadRatings(); // Reload ratings after submission
      toast.success("Rating submitted successfully");
    } catch (error) {
      toast.error("Failed to submit rating");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPercentage = (count: number) => {
    return ratings.totalRatings > 0 ? (count / ratings.totalRatings) * 100 : 0;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <BarChart className="w-6 h-6" />,
            label: "Level",
            value: course.level,
          },
          {
            icon: <Star className="w-6 h-6" />,
            label: "Rating",
            value: ratings.averageRating.toFixed(1),
          },
          {
            icon: <Users className="w-6 h-6" />,
            label: "Total Reviews",
            value: ratings.totalRatings.toString(),
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-full text-blue-900">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Course Rating</h3>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
          <div className="text-center mb-6 md:mb-0">
            <div className="text-5xl font-bold text-blue-900">
              {ratings.averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5"
                  fill={star <= ratings.averageRating ? "#1e3a8a" : "none"}
                  stroke={star <= ratings.averageRating ? "#1e3a8a" : "#d1d5db"}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {ratings.totalRatings}{" "}
              {ratings.totalRatings === 1 ? "rating" : "ratings"}
            </div>
          </div>

          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((num) => (
              <div key={num} className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1 w-20">
                  {[...Array(num)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill="#1e3a8a"
                      stroke="#1e3a8a"
                    />
                  ))}
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-900 rounded-full"
                    style={{
                      width: `${getPercentage(ratings.distribution[num])}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-20">
                  {ratings.distribution[num]} (
                  {getPercentage(ratings.distribution[num]).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}
