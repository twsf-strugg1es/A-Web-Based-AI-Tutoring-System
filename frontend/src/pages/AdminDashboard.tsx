import { useState } from "react";
import { Layout } from "../components/admin/Layout";
import { CourseList } from "../components/admin/CourseList";

import { FeedbackList } from "../components/admin/FeedBackList";
// import { FeedbackList } from "../components/admin/feedback/FeedbackList";

type AdminView = "courses" | "feedback";

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState<AdminView>("courses");

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === "courses" && <CourseList />}

      {currentView === "feedback" && <FeedbackList />}
    </Layout>
  );
}
