import { SplashScreen, Stack } from "expo-router";
import { ApiProvider } from "@/context/apiContext";
import { AuthProvider } from "@/context/authContext";
import { QueryProvider } from "@/context/qeuryContext";


SplashScreen.preventAutoHideAsync()
export default function RootLayout() {


    return (
        <Stack initialRouteName="index">
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="verify" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="completesignup" options={{ headerShown: false }} />
            <Stack.Screen name="2fa" options={{ headerShown: false }} />
        </Stack>
    );
}