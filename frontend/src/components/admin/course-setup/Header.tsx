import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface HeaderProps {
  progress: number;
  totalSteps: number;
  isComplete: boolean;
  onPublish: () => void;
}

export function Header({ progress, totalSteps, isComplete, onPublish }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Setup</h1>
          <p className="text-sm text-gray-600 mt-1">
            Complete all fields ({progress}/{totalSteps})
          </p>
        </div>

        <div className="relative group">
          <motion.button
            whileHover={isComplete ? { scale: 1.02 } : undefined}
            whileTap={isComplete ? { scale: 0.98 } : undefined}
            onClick={onPublish}
            disabled={!isComplete}
            className={`
              px-6 py-2 rounded-lg font-medium transition-colors
              ${isComplete
                ? 'bg-blue-900 text-white hover:bg-blue-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Publish Course
          </motion.button>

          {!isComplete && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 text-white text-sm rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="flex items-start">
                <Info className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                <p>Complete all required fields to publish your course</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(progress / totalSteps) * 100}%` }}
          className="h-full bg-blue-900 rounded-full"
        />
      </div>
    </header>
  );
}