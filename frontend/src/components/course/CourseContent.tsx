import { ChevronDown, Play, CheckCircle } from 'lucide-react';

const chapters = [
  {
    title: 'Chapter 1: Introduction',
    lessons: [
      { title: 'Welcome to the Course', duration: '5:20', completed: true },
      { title: 'Course Overview', duration: '8:15', completed: true },
      { title: 'Setting Up Your Environment', duration: '12:30', completed: false },
    ]
  },
  {
    title: 'Chapter 2: Fundamentals',
    lessons: [
      { title: 'Basic Concepts', duration: '15:45', completed: false },
      { title: 'Core Principles', duration: '10:20', completed: false },
      { title: 'Practical Examples', duration: '18:30', completed: false },
    ]
  },
  {
    title: 'Chapter 3: Advanced Topics',
    lessons: [
      { title: 'Advanced Techniques', duration: '20:15', completed: false },
      { title: 'Best Practices', duration: '16:40', completed: false },
      { title: 'Real-world Applications', duration: '25:10', completed: false },
    ]
  },
  {
    title: 'Chapter 4: Final Project',
    lessons: [
      { title: 'Project Overview', duration: '10:30', completed: false },
      { title: 'Implementation Steps', duration: '30:20', completed: false },
      { title: 'Testing and Deployment', duration: '22:15', completed: false },
    ]
  }
];

export function CourseContent() {
  return (
    <div className="space-y-4">
      {chapters.map((chapter, index) => (
        <details key={index} className="bg-white rounded-lg shadow-sm" open={index === 0}>
          <summary className="flex items-center justify-between p-4 cursor-pointer">
            <h3 className="text-lg font-semibold">{chapter.title}</h3>
            <ChevronDown className="w-5 h-5 transform transition-transform" />
          </summary>
          <div className="p-4 pt-0 space-y-2">
            {chapter.lessons.map((lesson, lessonIndex) => (
              <div
                key={lessonIndex}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {lesson.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Play className="w-5 h-5 text-blue-900" />
                  )}
                  <span className={lesson.completed ? 'text-gray-500' : 'text-gray-900'}>
                    {lesson.title}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{lesson.duration}</span>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}