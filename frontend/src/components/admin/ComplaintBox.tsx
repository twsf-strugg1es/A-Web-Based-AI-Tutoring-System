
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

interface Review {
  id: string;
  feedback: string;
  courseTitle: string;
  firstName: string;
  lastName: string;
  rating: number;
  createdAt: string;
  isRead: boolean;
}

export function ComplaintBox() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await api.get('/admin/reviews/unread');
      if (response.data.success) {
        setReviews(response.data.data);
      }
    } catch (error) {
      toast.error('Error loading reviews');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (reviewId: string) => {
    try {
      await api.put(`/admin/reviews/${reviewId}/mark-read`);
      setReviews(reviews.filter(review => review.id !== reviewId));
      toast.success('Review marked as read');
    } catch (error) {
      toast.error('Error marking review as read');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-900">Course Reviews</h2>
      
      {reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No unread reviews at the moment
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {review.courseTitle}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    By {review.firstName} {review.lastName}
                  </p>
                </div>
                <button
                  onClick={() => handleMarkAsRead(review.id)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Mark as read"
                >
                  <Check className="w-5 h-5 text-green-600" />
                </button>
              </div>

              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5"
                    fill={star <= review.rating ? '#1e3a8a' : 'none'}
                    stroke={star <= review.rating ? '#1e3a8a' : '#d1d5db'}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="mt-4 text-gray-700">{review.feedback}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
