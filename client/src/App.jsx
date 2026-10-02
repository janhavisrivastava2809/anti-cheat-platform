import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ManageQuestions from "./pages/ManageQuestions";
import ProtectedRoute from "./components/ProtectedRoute";

import AssessmentLogin from "./pages/AssessmentLogin";
import AssessmentInstructions from "./pages/AssessmentInstructions";
import Assessment from "./pages/Assessment";
import LaunchPortal from "./pages/LaunchPortal";
import ProtectionSpecs from "./pages/ProtectionSpecs";
import GetStarted from "./pages/GetStarted";
import AssessmentTestPage from "./pages/AssessmentTestPage";
import ProfilePage from "./pages/ProfilePage";
import MyAssessmentsPage from "./pages/MyAssessmentsPage";
import ResultsPage from "./pages/ResultsPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} /> {/* 2. Add Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/assessment-login" element={<AssessmentLogin />} />
        <Route path="/launch-portal" element={<LaunchPortal />} />
        <Route path="/protection-specs" element={<ProtectionSpecs />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/assessment/:id" element={<AssessmentInstructions />} />
        <Route path="/assessment/:id/start" element={<Assessment />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/my-assessments" element={<MyAssessmentsPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Dynamic route for all assessment buttons */}
        <Route path="/assessment/:testId" element={<AssessmentTestPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/assessments/:id/questions"
          element={
            <ProtectedRoute roleRequired="admin">
              <ManageQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;