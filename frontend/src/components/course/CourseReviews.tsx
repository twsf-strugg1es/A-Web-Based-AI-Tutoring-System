<<<<<<< Updated upstream
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
=======
import { useState, useEffect } from "react";
import { Star, MessageSquare, ThumbsUp, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CourseRatingsDistribution,
  CourseService,
} from "../../services/course";
import { FeedbackService } from "../../services/feedback";
import { toast } from "react-hot-toast";

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  review: string;
  createdAt: string;
  helpfulCount: number;
}

export function CourseReviews({ courseId }: { courseId: string }) {
  const [ratings, setRatings] = useState<CourseRatingsDistribution>({
    totalRatings: 0,
    averageRating: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
  const [userRating, setUserRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [review, setReview] = useState("");
  const [isRevSubmitting, setRevSubmitting] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [filter, setFilter] = useState<"all" | number>("all");

  useEffect(() => {
    loadRatings();
    loadReviews();
  }, [courseId]);

  const loadRatings = async () => {
    try {
      const ratingsData = await CourseService.getCourseRatings(courseId);
      setRatings(ratingsData);
    } catch (error) {
      console.error("Error loading ratings:", error);
    }
  };

  const loadReviews = async () => {
    try {
      const reviewsData = await FeedbackService.getCourseReviews(courseId);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  };

  const handleRatingSubmit = async (rating: number) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await CourseService.submitRating(courseId, rating);
      setUserRating(rating);
      await loadRatings();
      toast.success("Rating submitted successfully");
    } catch (error) {
      toast.error("Failed to submit rating");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!courseId || !userRating) {
      toast.error("Please provide a rating before submitting a review");
      return;
    }

    if (!review.trim()) {
      toast.error("Please write a review");
      return;
    }

    setRevSubmitting(true);
    try {
      const response = await FeedbackService.submitFeedback(courseId, review);
      if (response.success) {
        toast.success("Review submitted successfully");
        setReview("");
        await loadReviews();
      } else {
        toast.error(response.error?.message || "Failed to submit review");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the review");
    } finally {
      setRevSubmitting(false);
    }
  };

  const handleHelpful = async (reviewId: string) => {
    try {
      await FeedbackService.markHelpful(reviewId);
      await loadReviews();
      toast.success("Marked as helpful");
    } catch (error) {
      toast.error("Failed to mark review as helpful");
    }
  };

  const filteredReviews =
    filter === "all"
      ? reviews
      : reviews.filter((review) => review.rating === filter);

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };
>>>>>>> Stashed changes

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
<<<<<<< Updated upstream
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
=======
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
          {/* Left Column - Rating Stats */}
          <div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-5xl font-bold text-blue-900">
                {ratings.averageRating.toFixed(1)}
              </div>
              <div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
>>>>>>> Stashed changes
                    <Star
                      key={star}
                      className="w-5 h-5"
                      fill={star <= ratings.averageRating ? "#1e3a8a" : "none"}
                      stroke={
                        star <= ratings.averageRating ? "#1e3a8a" : "#d1d5db"
                      }
                    />
                  ))}
                </div>
<<<<<<< Updated upstream
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
=======
                <div className="text-sm text-gray-500 mt-1">
                  Based on {ratings.totalRatings}{" "}
                  {ratings.totalRatings === 1 ? "rating" : "ratings"}
                </div>
>>>>>>> Stashed changes
              </div>
            </div>

<<<<<<< Updated upstream
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
=======
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((num) => (
                <button
                  key={num}
                  onClick={() => setFilter(filter === num ? "all" : num)}
                  className="w-full group"
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 w-24">
                      <Star
                        className="w-4 h-4 text-gray-400"
                        fill="currentColor"
                      />
                      <span className="text-sm text-gray-600">{num}</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden group-hover:bg-gray-200 transition-colors">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            (ratings.distribution[num] / ratings.totalRatings) *
                              100 || 0
                          }%`,
                        }}
                        className="h-full bg-blue-900 rounded-full"
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-16 text-right">
                      {Math.round(
                        (ratings.distribution[num] / ratings.totalRatings) *
                          100 || 0
                      )}
                      %
                    </span>
                  </div>
                </button>
              ))}
>>>>>>> Stashed changes
            </div>
            <p className="text-gray-700">{review.feedback}</p>
          </div>
<<<<<<< Updated upstream
        ))}
=======

          {/* Right Column - Submit Rating */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate this course
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRatingSubmit(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    disabled={isSubmitting}
                    className={`p-1.5 rounded-full transition-colors ${
                      star <= (hoveredRating || userRating)
                        ? "text-blue-900"
                        : "text-gray-400"
                    } hover:bg-blue-50`}
                  >
                    <Star
                      className="w-6 h-6"
                      fill={
                        star <= (hoveredRating || userRating)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </motion.button>
                ))}
                {hoveredRating > 0 && (
                  <span className="ml-2 text-sm text-gray-600">
                    {ratingLabels[hoveredRating as keyof typeof ratingLabels]}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Write a review
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                disabled={isRevSubmitting || !userRating}
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-900 disabled:bg-gray-50"
                placeholder={
                  userRating
                    ? "Share your experience with this course..."
                    : "Please rate the course first"
                }
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFeedbackSubmit}
              disabled={isRevSubmitting || !userRating}
              className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:bg-blue-300 flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isRevSubmitting ? "Submitting..." : "Submit Review"}</span>
            </motion.button>
          </div>
        </div>
>>>>>>> Stashed changes
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow-sm divide-y">
        <div className="p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {filter === "all" ? "All Reviews" : `${filter}-Star Reviews`}
          </h3>
          {filter !== "all" && (
            <button
              onClick={() => setFilter("all")}
              className="text-sm text-blue-900 hover:text-blue-800"
            >
              Show all reviews
            </button>
          )}
        </div>

        <AnimatePresence>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4"
                            fill={star <= review.rating ? "#1e3a8a" : "none"}
                            stroke={
                              star <= review.rating ? "#1e3a8a" : "#d1d5db"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">
                        {review.userName}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{review.review}</p>
                  </div>
                  <button
                    onClick={() => handleHelpful(review.id)}
                    className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-900"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.helpfulCount}</span>
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center text-gray-500"
            >
              <AlertCircle className="w-8 h-8 mx-auto mb-2" />
              <p>No reviews yet for this rating</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
