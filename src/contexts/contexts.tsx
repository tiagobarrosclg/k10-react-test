import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { sleep } from '../utils/sleep';
import { useConfig } from './config';

export const Contexts: React.FC = ({ children }) => {
  const { fontsLoaded } = useConfig();

  const [splashHided, setSplashHided] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (fontsLoaded && !splashHided) {
          await sleep(600);
          await SplashScreen.hideAsync();

          setSplashHided(true);
        }
      } catch (err) {
        console.warn(err);
      }
    };

    loadData();
  }, [fontsLoaded, splashHided]);

  if (fontsLoaded) return <>{children}</>;

  return <></>;
};
