import {
  SpaceMono_400Regular,
  SpaceMono_400Regular_Italic,
  SpaceMono_700Bold,
  SpaceMono_700Bold_Italic,
  useFonts,
} from '@expo-google-fonts/space-mono';
import { createContext, useContext, useMemo } from 'react';

type ConfigContextData = {
  fontsLoaded: boolean;
};

export const ConfigContext = createContext<ConfigContextData>(
  {} as ConfigContextData
);

export const ConfigProvider: React.FC = ({ children }) => {
  const [fontsLoaded] = useFonts({
    SpaceMono_400Regular,
    SpaceMono_400Regular_Italic,
    SpaceMono_700Bold,
    SpaceMono_700Bold_Italic,
  });

  const memoizedValues = useMemo<ConfigContextData>(
    () => ({
      fontsLoaded,
    }),
    [fontsLoaded]
  );

  return (
    <ConfigContext.Provider value={memoizedValues}>
      {children}
    </ConfigContext.Provider>
  );
};

export function useConfig(): ConfigContextData {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error('useConfig must be used within an ConfigProvider');
  }

  return context;
}
