import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ContextProviders } from '~/contexts';
import { Routes } from '~/routes/index';

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

        <StatusBar style="dark" />
      </SafeAreaProvider>
    </ContextProviders>
  );
}
