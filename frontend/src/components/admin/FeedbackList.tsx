import { useState, useEffect } from "react";
import {
  Star,
  CheckCircle,
  XCircle,
  MessageSquare,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { toast } from "react-hot-toast";
import { AdminService } from "../../services/admin";

interface Feedback {
  id: string;
  courseId: string;
  courseName: string;
  userId: string;
  userName: string;
  rating: number;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export function FeedbackList({ courseId }: { courseId?: string }) {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );

  useEffect(() => {
    loadFeedback();
  }, [courseId]);

  const loadFeedback = async () => {
    try {
      const response = await AdminService.getCourseFeedback(courseId);
      if (response.success && response.data) {
        setFeedback(response.data);
      } else {
        toast.error("Failed to load feedback");
      }
    } catch (error) {
      toast.error("Error loading feedback");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (feedbackId: string) => {
    try {
      const response = await AdminService.markFeedbackAsRead(feedbackId);
      if (response.success) {
        setFeedback((prev) =>
          prev.map((f) => (f.id === feedbackId ? { ...f, isRead: true } : f))
        );
        toast.success("Marked as read");
      }
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const filteredFeedback = feedback
    .filter((f) => filter === "all" || (filter === "unread" && !f.isRead))
    .filter(
      (f) =>
        f.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Course Feedback</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search feedback..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "unread")}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Feedback</option>
            <option value="unread">Unread</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
        </div>
      ) : filteredFeedback.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm divide-y">
          <AnimatePresence>
            {filteredFeedback.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  !item.isRead ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{item.userName}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Course: {item.courseName}
                    </div>
                    <p className="text-gray-700">{item.message}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!item.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(item.id)}
                        className="p-2 text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedFeedback(item)}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                      title="View details"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No feedback found
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? "No feedback matches your search criteria"
              : "No feedback has been submitted yet"}
          </p>
        </div>
      )}

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Feedback Details</h3>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Student
                </label>
                <p className="mt-1">{selectedFeedback.userName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <p className="mt-1">{selectedFeedback.courseName}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Feedback
                </label>
                <p className="mt-1">{selectedFeedback.message}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Submitted
                </label>
                <p className="mt-1">
                  {new Date(selectedFeedback.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
