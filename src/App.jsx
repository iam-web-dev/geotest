import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import GlobeLoader from './components/GlobeLoader';
import Home from './pages/Home';
import Tests from './pages/Tests';
import Library from './pages/Library';
import Quiz from './pages/Quiz';
import Games from './pages/Games';
import GamePlay from './pages/GamePlay';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Settings from './pages/Settings';
import Certificates from './pages/Certificates';
import Oferta from './pages/Oferta';
import Activity from './pages/Activity';
import Rankings from './pages/Rankings';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import BookReader from './pages/BookReader';

const queryClient = new QueryClient();

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
          <BrowserRouter>
            <ScrollToTop />
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
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;