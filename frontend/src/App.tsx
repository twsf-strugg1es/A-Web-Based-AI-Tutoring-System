import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CourseSetupProvider } from './contexts/CourseSetupContext';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { SearchResults } from './pages/SearchResults';
import { AdminDashboard } from './pages/AdminDashboard';
import { ExploreCourses } from './pages/ExploreCourses';
import { CourseView } from './pages/CourseView';
import { CourseSetupPage } from './pages/CourseSetupPage';
import { ChapterDetailsPage } from './pages/ChapterDetailsPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MyLearning } from './pages/MyLearning';
<<<<<<< Updated upstream
=======

import { CourseOverview } from './pages/CourseOverview';
import { WhiteboardInventory } from './pages/WhiteboardInventory';

>>>>>>> Stashed changes
export function App() {
  return (
    <Router>
      <CourseSetupProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <SearchResults />
              </ProtectedRoute>
            } 
          />
         
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/courses/:courseId/edit" 
            element={
              <ProtectedRoute requireAdmin>
                <CourseSetupPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/courses/:courseId/chapters/:chapterId" 
            element={
              <ProtectedRoute requireAdmin>
                <ChapterDetailsPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/explore" element={<ExploreCourses />} />
          <Route 
            path="/course/:id" 
            element={
              <ProtectedRoute>
                <CourseView />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-learning" 
            element={
              <ProtectedRoute>
                <MyLearning />
              </ProtectedRoute>
            } 
          />
<<<<<<< Updated upstream
=======
          <Route path="/inventory" element={
          <ProtectedRoute>
            <WhiteboardInventory />
          </ProtectedRoute>
        } />
          
          <Route 
            path="/courses/overview/:id" 
            element={
              <ProtectedRoute>
                <CourseOverview />
              </ProtectedRoute>
            } 
          />
>>>>>>> Stashed changes
        </Routes>
      </CourseSetupProvider>
    </Router>
  );
}
