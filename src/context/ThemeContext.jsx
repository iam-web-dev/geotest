/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('geobek-theme') || localStorage.getItem('geotest-theme');
    if (saved) return saved === 'dark';
    return false;
  });

  const isTransitioningRef = useRef(false);

  useEffect(() => {
    localStorage.setItem('geobek-theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = (event) => {
    if (isTransitioningRef.current) return;

    // 1. Koordinatani aniqlash (bosilgan tugma yoki kursor markazi)
    let x = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    let y = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

    if (event && typeof event.clientX === 'number' && (event.clientX !== 0 || event.clientY !== 0)) {
      x = event.clientX;
      y = event.clientY;
    } else if (event?.currentTarget && typeof event.currentTarget.getBoundingClientRect === 'function') {
      const rect = event.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if (event?.target && typeof event.target.getBoundingClientRect === 'function') {
      const rect = event.target.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const nextMode = !darkMode;

    // 2. View Transitions API qo'llab-quvvatlanishini va animatsiya xohishini tekshirish
    const supportsViewTransition =
      typeof document !== 'undefined' &&
      typeof document.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!supportsViewTransition) {
      // Eskiroq brauzerlar uchun silliq doira to'lqini (fallback)
      runFallbackRipple(x, y, nextMode, () => {
        setDarkMode(nextMode);
      });
      return;
    }

    isTransitioningRef.current = true;

    // 3. Markazdan ekranning eng uzoq burchagigacha bo'lgan radius
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Kadrni suratga olish paytida oraliq rang aralashishlarini to'xtatib turish
    document.documentElement.classList.add('theme-transitioning');

    let transition;
    try {
      transition = document.startViewTransition(() => {
        flushSync(() => {
          if (nextMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          localStorage.setItem('geobek-theme', nextMode ? 'dark' : 'light');
          setDarkMode(nextMode);
        });
      });
    } catch {
      document.documentElement.classList.remove('theme-transitioning');
      isTransitioningRef.current = false;
      setDarkMode(nextMode);
      return;
    }

    transition.ready
      .then(() => {
        const animation = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${Math.round(x)}px ${Math.round(y)}px)`,
              `circle(${Math.ceil(endRadius)}px at ${Math.round(x)}px ${Math.round(y)}px)`,
            ],
          },
          {
            duration: 520,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );

        animation.onfinish = () => {
          document.documentElement.classList.remove('theme-transitioning');
          isTransitioningRef.current = false;
        };
      })
      .catch(() => {
        document.documentElement.classList.remove('theme-transitioning');
        isTransitioningRef.current = false;
      });

    transition.finished
      .finally(() => {
        document.documentElement.classList.remove('theme-transitioning');
        isTransitioningRef.current = false;
      });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function runFallbackRipple(x, y, nextMode, applyChange) {
  if (typeof document === 'undefined') {
    applyChange();
    return;
  }

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const ripple = document.createElement('div');
  const size = Math.ceil(endRadius * 2.2);
  ripple.style.position = 'fixed';
  ripple.style.left = `${Math.round(x - size / 2)}px`;
  ripple.style.top = `${Math.round(y - size / 2)}px`;
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.borderRadius = '50%';
  ripple.style.backgroundColor = nextMode ? '#070D18' : '#F6F8FC';
  ripple.style.pointerEvents = 'none';
  ripple.style.zIndex = '999999';
  ripple.style.transform = 'scale(0)';
  ripple.style.transition = 'transform 440ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease';
  ripple.style.opacity = '1';

  document.body.appendChild(ripple);
  void ripple.offsetHeight;
  ripple.style.transform = 'scale(1)';

  setTimeout(() => {
    applyChange();
    ripple.style.opacity = '0';
    setTimeout(() => {
      ripple.remove();
    }, 220);
  }, 260);
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}