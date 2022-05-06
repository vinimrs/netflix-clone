import { useState, useEffect, createContext } from 'react';

interface WindowDimsContext {
  width: number;
  height: number;
}

export const WindowDimsContext = createContext<WindowDimsContext | null>(null);
WindowDimsContext.displayName = 'WindowDims';

function getWindowDimensions() {
  if (window !== undefined) {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
}

export const WindowDimsProvider: React.FC = ({ children }) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    setWindowDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <WindowDimsContext.Provider
      value={{
        width: windowDimensions.width,
        height: windowDimensions.height,
      }}
    >
      {children}
    </WindowDimsContext.Provider>
  );
};
