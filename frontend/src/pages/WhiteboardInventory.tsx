import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Download, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "react-hot-toast";
import { WhiteboardService } from "../services/whiteboard";

interface WhiteboardDrawing {
  id: string;
  courseId: string;
  chapterId: string;
  drawing: string; // base64 string
  createdAt: string;
  courseName: string;
  chapterName: string;
}

interface GroupedDrawings {
  [courseId: string]: {
    courseName: string;
    drawings: WhiteboardDrawing[];
  };
}

export function WhiteboardInventory() {
  const [drawings, setDrawings] = useState<GroupedDrawings>({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(
    new Set()
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    loadDrawings();
  }, []);

  const loadDrawings = async () => {
    try {
      const response = await WhiteboardService.getAllDrawings();
      if (response.success && response.data) {
        // Group drawings by courseId
        const grouped = response.data.reduce(
          (acc: GroupedDrawings, drawing) => {
            if (!acc[drawing.courseId]) {
              acc[drawing.courseId] = {
                courseName: drawing.courseName,
                drawings: [],
              };
            }
            acc[drawing.courseId].drawings.push(drawing);
            return acc;
          },
          {}
        );
        setDrawings(grouped);
      }
    } catch (error) {
      toast.error("Failed to load whiteboard drawings");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCourse = (courseId: string) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  const handleDownload = async (drawing: WhiteboardDrawing) => {
    try {
      // Convert base64 to blob
      const response = await fetch(drawing.drawing);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Create link to download the blob
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `whiteboard-${drawing.courseName}-${drawing.chapterName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error("Failed to download drawing");
    }
  };

  const handleDelete = async (drawingId: string) => {
    try {
      const response = await WhiteboardService.deleteDrawing(drawingId);
      if (response.success) {
        toast.success("Drawing deleted successfully");
        loadDrawings();
      }
    } catch (error) {
      toast.error("Failed to delete drawing");
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Whiteboard Inventory
        </h1>

        {Object.keys(drawings).length === 0 ? (
          <div className="text-center py-12">
            <Pencil className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No drawings yet
            </h2>
            <p className="text-gray-500">
              Your saved whiteboard drawings will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(drawings).map(
              ([courseId, { courseName, drawings }]) => (
                <motion.div
                  key={courseId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleCourse(courseId)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <h2 className="text-xl font-semibold text-gray-900">
                      {courseName}
                    </h2>
                    {expandedCourses.has(courseId) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {expandedCourses.has(courseId) && (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {drawings.map((drawing) => (
                        <div
                          key={drawing.id}
                          className="border border-gray-200 rounded-lg p-4 space-y-4"
                        >
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={`data:image/jpeg;base64,${drawing.drawing}`}
                              alt={`Whiteboard for ${drawing.chapterName}`}
                              className="w-full h-full object-contain cursor-pointer"
                              onClick={() => setSelectedImage(drawing.drawing)}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {drawing.chapterName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(drawing.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleDownload(drawing)}
                              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                              title="Download"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(drawing.id)}
                              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )
            )}
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-[90vw] max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Enlarged whiteboard drawing"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
