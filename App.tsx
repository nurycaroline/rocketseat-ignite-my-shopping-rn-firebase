import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';
import theme from './src/theme';
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  const onLayoutRootView = useCallback(async () => {
    if (!fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {/* <StatusBar style="light" /> */}
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Routes />
      </SafeAreaView>
    </ThemeProvider>
  );
}
