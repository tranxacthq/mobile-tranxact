import { SplashScreen, Stack } from "expo-router";
import '../global.css';
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { ApiProvider } from "@/context/apiContext";
import { AuthProvider } from "@/context/authContext";
import { QueryProvider } from "@/context/qeuryContext";


SplashScreen.preventAutoHideAsync()
export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Neurial Grotesk-regular': require('../assets/fonts/Neurial Grotesk-regular.ttf'),
    'Neurial Grotesk-redium': require('../assets/fonts/Neurial Grotesk-medium.ttf'),
    'Neurial Grotesk-bold': require('../assets/fonts/Neurial Grotesk-bold.ttf'),

    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),

    'Termina-Regular': require('../assets/fonts/TerminaTest-Regular.ttf'),
    'Termina-Medium': require('../assets/fonts/TerminaTest-Medium.ttf'),
    'Termina-Bold': require('../assets/fonts/TerminaTest-Bold.ttf'),
  });

  useEffect(() => {
    if (error) {
      console.error("Font loading error:", error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <ApiProvider>
        <AuthProvider>
          <Stack initialRouteName="index">
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="verify" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="completesignup" options={{ headerShown: false }} />
            <Stack.Screen name="2fa" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </ApiProvider>
    </QueryProvider>
  );
}