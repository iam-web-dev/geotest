import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import GlobeLoader from './components/GlobeLoader';
import Home from './pages/Home';

const Tests = lazy(() => import('./pages/Tests'));
const Library = lazy(() => import('./pages/Library'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Games = lazy(() => import('./pages/Games'));
const GamePlay = lazy(() => import('./pages/GamePlay'));
const Articles = lazy(() => import('./pages/Articles'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Settings = lazy(() => import('./pages/Settings'));
const Certificates = lazy(() => import('./pages/Certificates'));
const Oferta = lazy(() => import('./pages/Oferta'));
const Activity = lazy(() => import('./pages/Activity'));
const Rankings = lazy(() => import('./pages/Rankings'));
const Profile = lazy(() => import('./pages/Profile'));
const Auth = lazy(() => import('./pages/Auth'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BookReader = lazy(() => import('./pages/BookReader'));

const queryClient = new QueryClient();

function RouteFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 rounded-full border-2 border-[var(--primary-soft)] border-t-[var(--primary)] animate-spin" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          {loading && <GlobeLoader onDone={() => setLoading(false)} />}
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route path="/" element={<Home />} />
                  <Route path="/tests" element={<Tests />} />
                  <Route path="/tests/:type" element={<Tests />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/games/play/:slug" element={<GamePlay />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/articles/:id" element={<ArticleDetail />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/certificates" element={<Certificates />} />
                  <Route path="/oferta" element={<Oferta />} />
                  <Route path="/activity" element={<Activity />} />
                  <Route path="/rankings" element={<Rankings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/read/:id" element={<ProtectedRoute><BookReader /></ProtectedRoute>} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;