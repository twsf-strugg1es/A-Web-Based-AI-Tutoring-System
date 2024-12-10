import { FileText, Download, ExternalLink } from 'lucide-react';

export function CourseNotes() {
  const resources = [
    {
      title: 'Course Introduction Slides',
      type: 'PDF',
      size: '2.5 MB',
      chapter: 'Chapter 1'
    },
    {
      title: 'Project Requirements Document',
      type: 'DOC',
      size: '1.8 MB',
      chapter: 'Chapter 2'
    },
    {
      title: 'Code Examples',
      type: 'ZIP',
      size: '4.2 MB',
      chapter: 'Chapter 3'
    },
    {
      title: 'Final Project Template',
      type: 'ZIP',
      size: '3.7 MB',
      chapter: 'Chapter 4'
    }
  ];

  const whiteboardResources = [
    {
      title: 'Lecture 1 Whiteboard Notes',
      date: '2024-03-10',
      link: '#'
    },
    {
      title: 'Problem Solving Session',
      date: '2024-03-12',
      link: '#'
    },
    {
      title: 'Project Planning Diagram',
      date: '2024-03-15',
      link: '#'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Course Resources */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Course Resources</h3>
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-900 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{resource.title}</h4>
                  <p className="text-sm text-gray-500">
                    {resource.chapter} • {resource.type} • {resource.size}
                  </p>
                </div>
              </div>
              <button className="flex items-center space-x-2 text-blue-900 hover:text-blue-800">
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Whiteboard Resources */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Whiteboard Resources</h3>
        <div className="space-y-4">
          {whiteboardResources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-900 hover:bg-blue-50/50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-white transition-colors">
                  <FileText className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{resource.title}</h4>
                  <p className="text-sm text-gray-500">
                    Created on {new Date(resource.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}