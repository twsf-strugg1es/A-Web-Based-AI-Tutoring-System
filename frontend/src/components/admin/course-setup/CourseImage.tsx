import { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface CourseImageProps {
  onUpdate: () => void;
}

export function CourseImage({ onUpdate }: CourseImageProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Image</h2>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          transition-colors
        `}
      >
        {imageUrl ? (
          <div className="relative">
            <img
              src={imageUrl}
              alt="Course preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={() => setImageUrl('')}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Upload className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drag and drop your course image here</p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <button
              onClick={() => {
                // Handle file selection logic here
                onUpdate();
              }}
              className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Choose File
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}