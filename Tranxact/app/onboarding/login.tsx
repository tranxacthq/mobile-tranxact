import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';

WebBrowser.maybeCompleteAuthSession();
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '32386291886-at8ndkpkjr0jh8a7sbaj4fdhdefkueng.apps.googleusercontent.com',
    androidClientId: '32386291886-mqtddk4hcbn54megj77gpvvvc90dgkpp.apps.googleusercontent.com',
    webClientId: "32386291886-uh0htfhiqnbhf7lnlgvhc94tp4etuabg.apps.googleusercontent.com"
  });

  const getUserInfo = async (token: string) => {
    try {
      const res = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.error) {
        console.error('Google API Error:', data.error);
        return;
      }

      await AsyncStorage.setItem('user', JSON.stringify(data));
      setUserInfo(data);
      console.log('User data:', data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      console.log('Access Token:', response.authentication.accessToken);
      console.log('User Info:', response.authentication);
      getUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  const handleGoogleSignIn = async () => {
    await promptAsync();
  };

  const handleContinue = () => {
    // if (!email.trim()) {
    //   alert("Please enter your email address");
    //   return;
    // }
    // if (!password.trim()) {
    //   alert("Please enter your password");
    //   return;
    // }
    router.push('/onboarding/2fa');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#07070C]">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="px-6 flex-1 justify-between">
            <View className="items-center mt-12 gap-4">
              <View className="items-center justify-center mb-4">
                <Image
                  source={require('../../assets/images/icon.png')}
                  className="h-24 w-30"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-white text-3xl font-bold mb-2 font-poppins">Welcome Back</Text>
              <Text className="text-white text-lg">Sign in to your tranxact account</Text>
              <View className="w-full space-y-4 mt-4 gap-4">
                <View>
                  <Text className="text-gray-400 text-base mb-2">Email Address</Text>
                  <TextInput
                    className="w-full bg-[#101115] text-white px-4 h-[50px] py-0 rounded-lg"
                    placeholderTextColor="#6b7280"
                    placeholder="Your email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                <View>
                  <Text className="text-gray-400 text-base mb-2">Password</Text>
                  <TextInput
                    className="w-full bg-[#101115] text-white px-4 h-[50px] py-0 rounded-lg"
                    placeholderTextColor="#6b7280"
                    placeholder="Your password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>

              <Button
                title="Continue"
                variant="primary"
                onPress={handleContinue}
                className="mb-10 mt-10 bg-white rounded-xl py-4 items-center w-[100%] "
                textClassName="text-[16px] font-poppins"
              />

            </View>

            <View className="mt-8 mb-8">
              <View className="flex-row items-center justify-center mb-8">
                <View className="h-px bg-gray-600 flex-1" />
                <Text className="text-white mx-4">Or Sign in with</Text>
                <View className="h-px bg-gray-600 flex-1" />
              </View>

              <View className="flex-row justify-center items-center gap-8">
                <TouchableOpacity className="w-16 h-16 rounded-full bg-black border border-gray-700 items-center justify-center">
                  <Image
                    source={require('../../assets/images/apple.png')}
                    className="w-14 h-14"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity className="w-16 h-16 rounded-full bg-black border border-gray-700 items-center justify-center">
                  <Image
                    source={require('../../assets/images/google.png')}
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-8">
              <View className="flex-row justify-center">
                <Text className="text-gray-400">Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/onboarding/signup')}>
                  <Text className="text-teal-400 font-medium">Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}