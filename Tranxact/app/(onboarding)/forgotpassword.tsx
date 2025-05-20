import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, Pressable, SafeAreaView, KeyboardAvoidingView,
    Platform, Image, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleContinue = () => {
        if (!email.trim()) {
            alert("Please enter your email address");
            return;
        }
        router.push({ pathname: '/(onboarding)/forgotpverify', params: { email } });
    };
    return (
        <SafeAreaView className="flex-1 bg-[#07070C]">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                            <Text className="text-white text-3xl font-semibold mb-2">Let's reset your password</Text>
                            <Text className="text-white text-lg">Enter your email address to continue</Text>
                            <View className="w-full space-y-4 mt-4">
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
                            </View>
                            <Button
                                title="Continue"
                                variant="primary"
                                onPress={handleContinue}
                                className="mb-10 mt-10 bg-white rounded-xl py-4 items-center w-[100%]"
                                textClassName='text-[16px] font-light text-black font-poppins'
                            />
                        </View>

                        <View className="mb-8">
                            <View className="flex-row justify-center">
                                <Text className="text-gray-400">Remember your password ? </Text>
                                <Pressable onPress={() => router.push('/(onboarding)/login')}>
                                    <Text className="text-teal-400 font-medium">Login</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
