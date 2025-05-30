import '@mantine/core/styles.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import ProtectedRoute from "./ProtectedRoute";


const Landing = lazy(() => import('./Landing'));
const DashboardHomePage = lazy(() => import('./dashboard/HomePage'));


export default function App() {
  return (
      <BrowserRouter>
        <Suspense fallback={<div>Chargement...</div>}>
          <Routes>
            <Route>
              <Route path="/" element={<Landing />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardHomePage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  );
}
