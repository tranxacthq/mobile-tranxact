import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = () => {
    if (!email.trim()) {
      alert("Please enter your email address");
      return;
    }
    if (!password.trim()) {
      alert("Please enter your password");
      return;
    }
    router.push('/verify');
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
                  source={require('../assets/images/icon.png')}
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
                    source={require('../assets/images/apple.png')}
                    className="w-14 h-14"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity className="w-16 h-16 rounded-full bg-black border border-gray-700 items-center justify-center">
                  <Image
                    source={require('../assets/images/google.png')}
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-8">
              <View className="flex-row justify-center">
                <Text className="text-gray-400">Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
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