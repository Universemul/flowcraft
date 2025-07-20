'use client';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
}

const createAppTheme = (mode: ThemeMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#0082FE',
      light: mode === 'dark' ? '#0082FE' : '#0082FE',
      dark: mode === 'dark' ? '#006ACC' : '#006ACC',
    },
    secondary: {
      main: mode === 'dark' ? '#B18CFF' : '#A259FF',
      light: mode === 'dark' ? '#C4A3FF' : '#B570FF',
      dark: mode === 'dark' ? '#9E75FF' : '#8F42FF',
    },
    error: {
      main: mode === 'dark' ? '#FF6B6B' : '#FF4D4F',
    },
    warning: {
      main: mode === 'dark' ? '#FFC107' : '#FFA600',
    },
    success: {
      main: mode === 'dark' ? '#00E5A0' : '#00C48C',
    },
    background: {
      default: mode === 'dark' ? '#2a3441' : '#F7FAFF',
      paper: mode === 'dark' ? '#354150' : '#E9F2FF',
    },
    text: {
      primary: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      secondary: mode === 'dark' ? '#B0C5DD' : '#5C5C5C',
    },
    divider: mode === 'dark' ? '#4a5568' : '#D1E3F8',
    action: {
      hover: mode === 'dark' ? 'rgba(74, 85, 104, 0.8)' : 'rgba(209, 227, 248, 0.8)',
      selected: mode === 'dark' ? 'rgba(74, 85, 104, 0.12)' : 'rgba(209, 227, 248, 0.12)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '--accent-warm': mode === 'dark' ? '#FF8C70' : '#FF7E6B',
        },
      },
    },
  },
});

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<ThemeMode>('dark');

  const toggleTheme = React.useCallback(() => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  const contextValue = React.useMemo(() => ({
    mode,
    toggleTheme,
  }), [mode, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ThemeContext.Provider>
  );
}