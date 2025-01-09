import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { ExploreCourses } from './pages/ExploreCourses';
import { SearchResults } from './pages/SearchResults';
import { CourseView } from './pages/CourseView';
import { MyLearning } from './pages/MyLearning';
import { AdminDashboard } from './pages/AdminDashboard';
import { CourseSetupPage } from './pages/CourseSetupPage';
import { ChapterDetailsPage } from './pages/ChapterDetailsPage';
import { WhiteboardInventory } from './pages/WhiteboardInventory';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CourseSetupProvider } from './contexts/CourseSetupContext';

export function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/explore" element={<ExploreCourses />} />
        <Route path="/search" element={<SearchResults />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/inventory" element={
          <ProtectedRoute>
            <WhiteboardInventory />
          </ProtectedRoute>
        } />

        <Route path="/my-learning" element={
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        } />

        <Route path="/course/:id" element={
          <ProtectedRoute>
            <CourseView />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/courses/:courseId/edit" element={
          <ProtectedRoute requireAdmin>
            <CourseSetupProvider>
              <CourseSetupPage />
            </CourseSetupProvider>
          </ProtectedRoute>
        } />

        <Route path="/admin/courses/:courseId/chapters/:chapterId" element={
          <ProtectedRoute requireAdmin>
            <CourseSetupProvider>
              <ChapterDetailsPage />
            </CourseSetupProvider>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}