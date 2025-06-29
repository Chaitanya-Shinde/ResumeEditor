import Homepage from "./components/homepage";
import { useState, useEffect, useLayoutEffect } from 'react';
import './App.css'

function App() {

// Key for localStorage
const THEME_STORAGE_KEY = 'app-theme';

  const [theme, setTheme] = useState(() => {
    // 1. Check localStorage first for a saved preference
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme; // 'light' or 'dark'
    }

    // 2. If no saved preference, detect system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  // useLayoutEffect runs synchronously after all DOM mutations,
  // but before the browser paints. This helps prevent FOUC.
  useLayoutEffect(() => {
    const htmlElement = document.documentElement;

    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    // You might also want to set the color-scheme meta tag for
    // better browser integration, though browsers usually handle it
    // if you have prefers-color-scheme media queries in CSS.
    // document.querySelector('meta[name="color-scheme"]').setAttribute('content', theme);

  }, [theme]); // Re-run effect whenever 'theme' state changes

  // Effect to listen for system theme changes AND save manual preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (event) => {
      // Only update if there's no *manual* override saved
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(event.matches ? 'dark' : 'light');
      }
    };

    // Add listener for system theme changes
    darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);

    // Save current theme to localStorage whenever it changes
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Cleanup listener on component unmount
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]); // Re-run effect when 'theme' changes to update localStorage and listener

  // Function to manually toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      // Save manual choice to localStorage
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      return newTheme;
    });
  };


  return (
    <>
      <Homepage toggleTheme={toggleTheme} theme={theme}/>
    </>
  )
}

export default App
