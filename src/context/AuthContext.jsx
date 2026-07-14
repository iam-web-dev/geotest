import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('geotest-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('geotest-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('geotest-user');
    }
  }, [user]);

  const signIn = (email, password) => {
    // Simulate sign in — replace with real auth later
    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      email,
      grade: '9',
      school: "O'zbekiston maktabi",
      favoriteSubject: 'Geografiya',
    };
    setUser(mockUser);
    return mockUser;
  };

  const signUp = (name, email, password) => {
    // Simulate sign up — replace with real auth later
    const mockUser = {
      id: Date.now().toString(),
      name,
      email,
      grade: '9',
      school: "O'zbekiston maktabi",
      favoriteSubject: 'Geografiya',
    };
    setUser(mockUser);
    return mockUser;
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}