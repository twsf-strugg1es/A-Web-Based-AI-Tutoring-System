import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChapterListProps {
  onUpdate: () => void;
}

export function ChapterList({ onUpdate }: ChapterListProps) {
  const [chapters, setChapters] = useState<{ title: string; lessons: string[] }[]>([]);

  const addChapter = () => {
    setChapters([...chapters, { title: '', lessons: [] }]);
    onUpdate();
  };

  const removeChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index));
    onUpdate();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Course Content</h2>
        <button
          onClick={addChapter}
          className="flex items-center space-x-2 text-blue-900 hover:text-blue-800"
        >
          <Plus className="w-5 h-5" />
          <span>Add Chapter</span>
        </button>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-4 mb-4">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
              <input
                type="text"
                value={chapter.title}
                onChange={(e) => {
                  const newChapters = [...chapters];
                  newChapters[index].title = e.target.value;
                  setChapters(newChapters);
                  onUpdate();
                }}
                placeholder="Chapter title"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removeChapter(index)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}