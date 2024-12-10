import { Clock, Users, BarChart, Award } from 'lucide-react';

export function CourseOverview() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Clock className="w-6 h-6" />, label: 'Duration', value: '12 Hours' },
          { icon: <Users className="w-6 h-6" />, label: 'Enrolled', value: '2,345 Students' },
          { icon: <BarChart className="w-6 h-6" />, label: 'Level', value: 'Intermediate' },
          { icon: <Award className="w-6 h-6" />, label: 'Certificate', value: 'Yes' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-full text-blue-900">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">About This Course</h3>
        <p className="text-gray-600 leading-relaxed">
          This comprehensive course will take you through all aspects of modern web development.
          You'll learn everything from the fundamentals to advanced concepts, with practical
          projects and real-world applications. Perfect for both beginners and intermediate
          developers looking to upgrade their skills.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Build modern, responsive web applications',
            'Master JavaScript and popular frameworks',
            'Implement secure authentication systems',
            'Deploy applications to production',
            'Work with databases and APIs',
            'Write clean, maintainable code',
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-900 rounded-full" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}