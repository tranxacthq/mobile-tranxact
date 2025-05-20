import { SplashScreen, Stack } from "expo-router";


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
            <Stack.Screen name="verify2fa" options={{ headerShown: false }} />
            <Stack.Screen name="loginpin" options={{ headerShown: false }} />
            <Stack.Screen name="forgotpassword" options={{ headerShown: false }} />
            <Stack.Screen name="forgotpverify" options={{ headerShown: false }} />
            <Stack.Screen name="resetpassword" options={{ headerShown: false }} />
        </Stack>
    );
}
