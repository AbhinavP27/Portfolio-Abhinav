import { Navigate, Route, Routes } from 'react-router-dom';
import PublicPortfolioPage from './pages/PublicPortfolioPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPortfolioPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
