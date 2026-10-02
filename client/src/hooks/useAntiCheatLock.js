import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export const useAntiCheat = (userId, assessmentId, maxWarnings = 3, onAutoSubmit) => {
  const [warnings, setWarnings] = useState(0);

  const logViolation = useCallback(async (type) => {
    try {
      setWarnings((prev) => {
        const next = prev + 1;
        if (next >= maxWarnings && onAutoSubmit) {
          alert('Maximum violations reached! Your test is being submitted automatically.');
          onAutoSubmit();
        }
        return next;
      });

      await axios.post('http://localhost:5000/api/proctor/log-violation', {
        userId,
        assessmentId,
        violationType: type
      });
    } catch (err) {
      console.error('Failed to log violation:', err);
    }
  }, [userId, assessmentId, maxWarnings, onAutoSubmit]);

  useEffect(() => {
    // 1. Tab switch / Blur detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        logViolation('TAB_SWITCH');
      }
    };

    // 2. Fullscreen exit detection
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        logViolation('FULLSCREEN_EXIT');
      }
    };

    // 3. Disable Right-click, Copy, Cut, Paste
    const preventAction = (e) => e.preventDefault();

    // 4. Block F12, Ctrl+Shift+I, Ctrl+C, Ctrl+V
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U'))
      ) {
        e.preventDefault();
        logViolation('DEVTOOLS_OPEN');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('contextmenu', preventAction);
    document.addEventListener('copy', preventAction);
    document.addEventListener('cut', preventAction);
    document.addEventListener('paste', preventAction);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('contextmenu', preventAction);
      document.removeEventListener('copy', preventAction);
      document.removeEventListener('cut', preventAction);
      document.removeEventListener('paste', preventAction);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [logViolation]);

  const enterFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  return { warnings, enterFullScreen };
};