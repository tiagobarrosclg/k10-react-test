import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ContextProviders } from './src/contexts';
import useColorScheme from './src/hooks/useColorScheme';
import { Routes } from './src/routes';

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const colorScheme = useColorScheme();

  return (
    <ContextProviders>
      <SafeAreaProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>

        <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
      </SafeAreaProvider>
    </ContextProviders>
  );
}
