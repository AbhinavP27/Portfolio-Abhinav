import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardOverview from './dashboard/DashboardOverview';
import HeroManagement from './dashboard/HeroManagement';
import AboutManagement from './dashboard/AboutManagement';
import SkillsManagement from './dashboard/SkillsManagement';
import ProjectsManagement from './dashboard/ProjectsManagement';
import ProjectImagesManagement from './dashboard/ProjectImagesManagement';
import ExperienceManagement from './dashboard/ExperienceManagement';
import CertificationsManagement from './dashboard/CertificationsManagement';
import MessagesPanel from './dashboard/MessagesPanel';
import ThemeManagement from './dashboard/ThemeManagement';
import LivePreview from './dashboard/LivePreview';
import AdminLoginPage from './pages/AdminLoginPage';
import PublicPortfolioPage from './pages/PublicPortfolioPage';
import { ProtectedRoute } from './hooks/useAuth';


function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPortfolioPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<DashboardOverview />} />
        <Route path="hero" element={<HeroManagement />} />
        <Route path="about" element={<AboutManagement />} />
        <Route path="skills" element={<SkillsManagement />} />
        <Route path="projects" element={<ProjectsManagement />} />
        <Route path="project-images" element={<ProjectImagesManagement />} />
        <Route path="experience" element={<ExperienceManagement />} />
        <Route path="certifications" element={<CertificationsManagement />} />
        <Route path="messages" element={<MessagesPanel />} />
        <Route path="theme" element={<ThemeManagement />} />
        <Route path="preview" element={<LivePreview />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
