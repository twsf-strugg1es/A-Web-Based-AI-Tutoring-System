// Update src/components/course/CourseReviews.tsx

import { useState, useEffect } from 'react';
import { ReviewForm } from './ReviewForm';
import { ReviewService, Review } from '../../services/review';
import { Star } from 'lucide-react';

interface CourseReviewsProps {
  courseId: string;
}

export function CourseReviews({ courseId }: CourseReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const response = await ReviewService.getCourseReviews(courseId);
      if (response.success && response.data) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [courseId]);

  const handleReviewSubmitted = () => {
    loadReviews();
  };

  // Calculate rating statistics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
    : 0;

  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading reviews...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5"
                  fill={star <= averageRating ? '#1e3a8a' : 'none'}
                  stroke={star <= averageRating ? '#1e3a8a' : '#d1d5db'}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Based on {totalReviews} reviews
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
                      width: `${(ratingCounts[num] || 0) / totalReviews * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-12">
                  {ratingCounts[num] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <ReviewForm courseId={courseId} onReviewSubmitted={handleReviewSubmitted} />
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium">{review.firstName} {review.lastName}</h4>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill={i < review.rating ? '#1e3a8a' : 'none'}
                      stroke={i < review.rating ? '#1e3a8a' : '#d1d5db'}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{review.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
