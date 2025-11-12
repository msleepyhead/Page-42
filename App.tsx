
import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';

import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import SubjectsPage from './pages/SubjectsPage';
import ResourceListPage from './pages/ResourceListPage';
import DiscussionPage from './pages/DiscussionPage';
import NoticesPage from './pages/NoticesPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import BottomNav from './components/BottomNav';

const App = (): React.ReactElement => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

const AppContent = (): React.ReactElement => {
  const { theme } = useTheme();

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <HashRouter>
      <Main />
    </HashRouter>
  );
};

const Main = (): React.ReactElement => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const showNav = user && location.pathname !== '/login' && location.pathname !== '/';

  if (loading) {
    return <SplashScreen />;
  }
  
  return (
    <div className="bg-bkg dark:bg-bkg-dark text-gray-800 dark:text-gray-200 font-sans h-screen w-screen flex flex-col items-center">
      <div className="relative w-full h-full max-w-md mx-auto shadow-2xl flex flex-col">
        <main className="flex-1 overflow-y-auto pb-20">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/subjects" /> : <SplashScreen />} />
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/subjects" />} />
            <Route path="/subjects" element={<ProtectedRoute><SubjectsPage /></ProtectedRoute>} />
            <Route path="/subjects/:subjectId" element={<ProtectedRoute><ResourceListPage /></ProtectedRoute>} />
            <Route path="/discussion" element={<ProtectedRoute><DiscussionPage /></ProtectedRoute>} />
            <Route path="/notices" element={<ProtectedRoute><NoticesPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
          </Routes>
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
};

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === 'admin' ? children : <Navigate to="/subjects" />;
};

export default App;
