import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';
import GlobeLoader from './components/GlobeLoader';
import Home from './pages/Home';
import Auth from './pages/Auth';

const Tests = lazy(() => import('./pages/Tests'));
const GeographicMap = lazy(() => import('./pages/GeographicMap'));
const School = lazy(() => import('./pages/School'));
const Library = lazy(() => import('./pages/Library'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Games = lazy(() => import('./pages/Games'));
const GamePlay = lazy(() => import('./pages/GamePlay'));
const Articles = lazy(() => import('./pages/Articles'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Announcements = lazy(() => import('./pages/Announcements'));
const AnnouncementDetail = lazy(() => import('./pages/AnnouncementDetail'));
const Settings = lazy(() => import('./pages/Settings'));
const Certificates = lazy(() => import('./pages/Certificates'));
const Oferta = lazy(() => import('./pages/Oferta'));
const Activity = lazy(() => import('./pages/Activity'));
const Rankings = lazy(() => import('./pages/Rankings'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Creator = lazy(() => import('./pages/Creator'));

const queryClient = new QueryClient();

import RouteFallback from './components/RouteFallback';

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
        <LanguageProvider>
          <ThemeProvider>
            {loading && <GlobeLoader onDone={() => setLoading(false)} />}
          <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Auth initialMode="signin" />} />
              <Route path="/register" element={<Auth initialMode="signup" />} />
              <Route path="/creator" element={<Creator />} />
              <Route path="/muallif" element={<Creator />} />
              <Route path="/author" element={<Creator />} />
              <Route path="/ibrohimjon" element={<Creator />} />
              <Route path="/oferta" element={<Oferta />} />
              <Route path="/terms" element={<Oferta />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<GeographicMap />} />
                <Route path="/xarita" element={<GeographicMap />} />
                <Route path="/geografik-xarita" element={<GeographicMap />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/tests/:type" element={<Tests />} />
                <Route path="/school" element={<School />} />
                <Route path="/maktab" element={<School />} />
                <Route path="/library" element={<Library />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/play/:slug" element={<GamePlay />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<ArticleDetail />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/elonlar" element={<Announcements />} />
                <Route path="/announcements/:id" element={<AnnouncementDetail />} />
                <Route path="/elonlar/:id" element={<AnnouncementDetail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/rankings" element={<Rankings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        </ThemeProvider>
      </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
