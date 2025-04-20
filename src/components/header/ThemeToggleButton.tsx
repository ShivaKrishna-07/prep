import { useState, useEffect } from 'react';
import { HiSun } from "react-icons/hi";
import { HiMoon } from "react-icons/hi";



export default function ThemeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode was previously enabled by the user
    const darkModePreference = window.localStorage.getItem('theme') === 'dark';
    setIsDarkMode(darkModePreference);
    document.documentElement.classList.toggle('dark', darkModePreference);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    // Store user preference
    window.localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
    >
      {isDarkMode ? <HiSun className='w-5' /> : <HiMoon className='w-5' />}
    </button>
  );
}
