import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeDebug = () => {
  const { isDark } = useTheme();
  const [hasDarkClass, setHasDarkClass] = useState(false);

  useEffect(() => {
    const checkDarkClass = () => {
      setHasDarkClass(document.documentElement.classList.contains('dark'));
    };
    checkDarkClass();
    const observer = new MutationObserver(checkDarkClass);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
      <div className="px-4 py-2 rounded-lg shadow-lg bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-xs text-gray-700 dark:text-gray-200">
        <div><b>Theme Debug</b></div>
        <div>isDark (context): <b>{isDark ? 'true' : 'false'}</b></div>
        <div>&lt;html&gt; has 'dark': <b>{hasDarkClass ? 'true' : 'false'}</b></div>
      </div>
    </div>
  );
};

export default ThemeDebug; 