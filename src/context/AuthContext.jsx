/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { user as initialMockUser } from '../data/mockData';
import { normalizeUzPhone } from '../lib/utils';

const AuthContext = createContext();

const STORAGE_KEY_USER = 'geo_auth_user';
const STORAGE_KEY_ACCOUNTS = 'geo_auth_accounts';
const STORAGE_KEY_LOGGED_OUT = 'geo_logged_out';
const STORAGE_KEY_SETTINGS = 'geo_user_settings';

function getStoredAccounts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('getStoredAccounts error:', e);
  }
  // Initialize with initialMockUser as default account
  const defaultAccount = {
    ...initialMockUser,
    id: 'user_default',
    username: 'yodgorov',
    phone: '+998901234567',
    password: 'password123',
    role: initialMockUser.role || 'school_student',
  };
  saveStoredAccounts([defaultAccount]);
  return [defaultAccount];
}

function saveStoredAccounts(accounts) {
  try {
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
  } catch (e) {
    console.error('saveStoredAccounts error:', e);
  }
}

function getStoredUser() {
  try {
    const isLoggedOut = localStorage.getItem(STORAGE_KEY_LOGGED_OUT) === 'true';
    if (isLoggedOut) return null;

    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge with user settings if any
      const settingsRaw = localStorage.getItem(STORAGE_KEY_SETTINGS);
      const settings = settingsRaw ? JSON.parse(settingsRaw) : {};
      return { ...parsed, ...settings };
    }

    // First time visitor: seed default demo user so app is interactive
    const defaultUser = {
      ...initialMockUser,
      id: 'user_default',
      username: 'yodgorov',
      phone: '+998901234567',
      role: initialMockUser.role || 'school_student',
    };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(defaultUser));
    return defaultUser;
  } catch (e) {
    console.error('getStoredUser error:', e);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          const u = data?.session?.user;
          if (u && mounted) {
            const profile = await loadProfile(u.id);
            const resolvedUser = profile || mapAuthUser(u);
            setUser(resolvedUser);
            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(resolvedUser));
            localStorage.removeItem(STORAGE_KEY_LOGGED_OUT);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn('Supabase session load error:', e.message);
        }
      }

      // Local storage fallback
      if (mounted) {
        const localUser = getStoredUser();
        setUser(localUser);
        setLoading(false);
      }
    }

    initAuth();

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!mounted) return;
        if (session?.user) {
          const profile = await loadProfile(session.user.id);
          const resolved = profile || mapAuthUser(session.user);
          setUser(resolved);
          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(resolved));
          localStorage.removeItem(STORAGE_KEY_LOGGED_OUT);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem(STORAGE_KEY_USER);
          localStorage.setItem(STORAGE_KEY_LOGGED_OUT, 'true');
        }
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      mounted = false;
    };
  }, []);

  async function loadProfile(authId) {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authId)
        .maybeSingle();
      if (error) throw error;
      return data;
    } catch (e) {
      console.warn('loadProfile error:', e.message);
      return null;
    }
  }

  function mapAuthUser(u) {
    return {
      ...initialMockUser,
      id: u.id,
      name: u.user_metadata?.name || 'Foydalanuvchi',
      username: u.user_metadata?.username || 'user',
      phone: u.phone || u.user_metadata?.phone || null,
      grade: u.user_metadata?.grade || 9,
      school: u.user_metadata?.school || "O'zbekiston maktabi",
      region: u.user_metadata?.region || 'Toshkent shahri',
      role: u.user_metadata?.role || 'school_student',
      favoriteSubject: 'Geografiya',
    };
  }

  // Sign Up
  const signUp = useCallback(async (formData) => {
    const rawPhone = formData.phone || '';
    const phone = normalizeUzPhone(rawPhone);
    const cleanUsername = (formData.username || '').trim().replace(/^@/, '').toLowerCase();
    const cleanName = (formData.name || '').trim();

    if (!cleanName) throw new Error('Iltimos, toʻliq ismingizni kiriting');
    if (!cleanUsername) throw new Error('Iltimos, username kiriting');
    if (cleanUsername.length < 3) throw new Error('Username kamida 3 ta belgidan iborat boʻlishi kerak');
    if (phone.replace(/\D/g, '').length < 12) throw new Error('Iltimos, toʻliq telefon raqamini kiriting (+998...)');
    if (!formData.password || formData.password.length < 6) throw new Error('Parol kamida 6 ta belgidan iborat boʻlishi kerak');

    // Check local accounts for duplicates
    const accounts = getStoredAccounts();
    const existing = accounts.find(
      acc => acc.username.toLowerCase() === cleanUsername || acc.phone === phone
    );
    if (existing) {
      if (existing.username.toLowerCase() === cleanUsername) {
        throw new Error(`"@${cleanUsername}" username allaqachon band. Boshqa username tanlang.`);
      }
      throw new Error('Bu telefon raqami allaqachon roʻyxatdan oʻtgan');
    }

    let newUser = null;

    // If Supabase is connected, attempt remote signup
    if (supabase) {
      try {
        const { data: authData, error } = await supabase.auth.signUp({
          phone,
          password: formData.password,
          options: {
            data: {
              name: cleanName,
              username: cleanUsername,
              phone,
              role: formData.role || 'school_student',
              grade: formData.grade || 9,
              school: formData.school || "O'zbekiston maktabi",
              region: formData.region || 'Toshkent shahri',
            },
          },
        });
        if (error) console.warn('Supabase signUp warning:', error.message);
        if (authData?.user) {
          newUser = mapAuthUser(authData.user);
        }
      } catch (e) {
        console.warn('Supabase signUp skipped/failed:', e.message);
      }
    }

    // Build complete user model
    if (!newUser) {
      newUser = {
        ...initialMockUser,
        id: 'user_' + Date.now(),
        name: cleanName,
        username: cleanUsername,
        phone,
        role: formData.role || 'school_student',
        grade: formData.grade || 9,
        school: formData.school || "O'zbekiston maktabi",
        region: formData.region || 'Toshkent shahri',
        email: `${cleanUsername}@geobek.uz`,
        password: formData.password,
        avatar: null,
        xp: 150,
        level: 1,
        streak: 1,
        rank: 99,
        totalTests: 0,
        totalQuizzes: 0,
        averageScore: 0,
        certificates: 0,
        nationalCertificates: [],
        badges: [
          {
            id: 1,
            name: 'Birinchi Qadam',
            icon: 'star',
            unlocked: true,
            date: new Date().toISOString().split('T')[0],
            desc: 'GeoBek safiga qoʻshildi',
            tier: 'bronze',
          },
        ],
        createdAt: new Date().toISOString(),
      };
    } else {
      newUser.password = formData.password;
    }

    // Save to local accounts
    accounts.push(newUser);
    saveStoredAccounts(accounts);

    // Save current active session
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newUser));
    localStorage.removeItem(STORAGE_KEY_LOGGED_OUT);

    setUser(newUser);
    return newUser;
  }, []);

  // Sign In
  const signIn = useCallback(async (formData) => {
    const rawIdentifier = (formData.identifier || formData.username || formData.phone || '').trim();
    const cleanIdentifier = rawIdentifier.replace(/^@/, '').toLowerCase();
    const normalizedPhone = normalizeUzPhone(rawIdentifier);
    const password = formData.password;

    if (!cleanIdentifier) {
      throw new Error('Iltimos, username yoki telefon raqamingizni kiriting');
    }
    if (!password) {
      throw new Error('Iltimos, parolingizni kiriting');
    }

    let foundUser = null;

    // Try Supabase if configured
    if (supabase) {
      try {
        let phoneToLogin = normalizedPhone;
        if (!rawIdentifier.startsWith('+') && !/^\d+$/.test(rawIdentifier)) {
          // Look up phone by username in Supabase
          const { data: profile } = await supabase
            .from('profiles')
            .select('phone')
            .eq('username', cleanIdentifier)
            .maybeSingle();
          if (profile?.phone) phoneToLogin = profile.phone;
        }

        if (phoneToLogin) {
          const { data: authData, error } = await supabase.auth.signInWithPassword({
            phone: phoneToLogin,
            password,
          });
          if (!error && authData?.user) {
            const profile = await loadProfile(authData.user.id);
            foundUser = profile || mapAuthUser(authData.user);
          }
        }
      } catch (e) {
        console.warn('Supabase signIn fallback to local:', e.message);
      }
    }

    // Local authentication lookup
    if (!foundUser) {
      const accounts = getStoredAccounts();
      const match = accounts.find(acc => {
        const accUsername = (acc.username || '').replace(/^@/, '').toLowerCase();
        const accPhone = acc.phone || '';
        return (
          accUsername === cleanIdentifier ||
          accPhone === normalizedPhone ||
          accPhone.replace(/\D/g, '') === rawIdentifier.replace(/\D/g, '')
        );
      });

      if (!match) {
        // Check default demo account credentials
        if (cleanIdentifier === 'yodgorov' || normalizedPhone === '+998901234567') {
          foundUser = {
            ...initialMockUser,
            id: 'user_default',
            username: 'yodgorov',
            phone: '+998901234567',
          };
        } else {
          throw new Error('Bunday username yoki telefon raqamiga ega foydalanuvchi topilmadi');
        }
      } else {
        // Validate password
        if (match.password && match.password !== password) {
          throw new Error('Kiritilgan parol notoʻgʻri. Iltimos, qayta tekshirib koʻring.');
        }
        foundUser = match;
      }
    }

    // Save active session
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(foundUser));
    localStorage.removeItem(STORAGE_KEY_LOGGED_OUT);
    setUser(foundUser);
    return foundUser;
  }, []);

  // Quick Demo Login
  const loginAsDemo = useCallback(() => {
    const demoUser = {
      ...initialMockUser,
      id: 'user_default',
      username: 'yodgorov',
      phone: '+998 90 123 45 67',
      role: initialMockUser.role || 'school_student',
    };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(demoUser));
    localStorage.removeItem(STORAGE_KEY_LOGGED_OUT);
    setUser(demoUser);
    return demoUser;
  }, []);

  // Sign Out
  const signOut = useCallback(async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signOut warning:', e.message);
      }
    }
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.setItem(STORAGE_KEY_LOGGED_OUT, 'true');
    setUser(null);
  }, []);

  // Update Profile
  const updateProfile = useCallback((updates) => {
    setUser(prev => {
      const merged = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(merged));
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(merged));

      // Update in accounts store too
      try {
        const accounts = getStoredAccounts();
        const updatedAccounts = accounts.map(acc => {
          if (acc.id === merged.id || acc.username === merged.username) {
            return { ...acc, ...updates };
          }
          return acc;
        });
        saveStoredAccounts(updatedAccounts);
      } catch (e) {
        console.error('updateProfile accounts sync error:', e);
      }

      return merged;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        loginAsDemo,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
