import { Navigate, Route, Routes } from 'react-router-dom';
import CalculationPage from '../features/calculation/CalculationPage';
import NotFoundPage from './NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/calculation" replace />} />
      <Route path="/calculation" element={<CalculationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
