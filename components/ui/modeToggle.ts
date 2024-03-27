import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';

const ModeToggle: React.FC = () => {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 't' && (event.altKey || event.metaKey)) {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [setTheme, theme]);

  return null; // Since this component doesn't render anything visible
};

export default ModeToggle;
