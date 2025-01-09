import { FileText, ExternalLink } from "lucide-react";
import ReactHtmlParser from 'react-html-parser';

export function CourseNotes({
  courseChapterText,
}: {
  courseChapterText: string;
}) {
  

  return (
    <div className="space-y-6">
      <div className="p-4 pt-0">
        <div
          className="mt-4 prose prose-sm max-w-none"
        >{ReactHtmlParser(courseChapterText)}</div>
      </div>

     
    </div>
  );
}
