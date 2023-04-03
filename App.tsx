import React, { useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import auth from '@react-native-firebase/auth';

import { Routes } from './src/routes';
import theme from './src/theme';
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignIn } from './src/screens/SignIn';

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

  const [userInfo, setUserInfo] = React.useState(null);

  useEffect(() => { 
    const subscriber = auth().onAuthStateChanged(() => {
      setUserInfo(auth().currentUser)
    });

    return subscriber; // unsubscribe on unmount
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {
          userInfo ? <Routes /> : <SignIn />
        }
      </SafeAreaView>
    </ThemeProvider>
  );
}
