import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView, KeyboardAvoidingView, Platform, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/components/Button';

export default function CompleteAccountScreen() {
    const { email } = useLocalSearchParams<{ email: string }>();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isPasswordValid = hasMinLength && hasUppercase && hasNumber && hasSpecial;

    const handleCreateAccount = () => {
        if (!firstName.trim()) {
            alert("Please enter your first name");
            return;
        }
        if (!lastName.trim()) {
            alert("Please enter your last name");
            return;
        }
        if (!isPasswordValid) {
            alert("Please enter a valid password");
            return;
        }
        if (!whatsappNumber.trim()) {
            alert("Please enter your WhatsApp number");
            return;
        }

        console.log("Creating account with:", {
            email,
            firstName,
            lastName,
            password,
            whatsappNumber
        });
        router.push({
            pathname: '/(onboarding)/2fa',
            params: { email: email }
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-[#07070C]">
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <View className="px-4 flex-1 justify-between">
                        <View>
                            <Pressable onPress={() => router.back()} className="mt-6">
                                <Text className="text-white text-2xl">←</Text>
                            </Pressable>

                            <View className="items-center mt-8 mb-8">
                                <Image
                                    source={require('../../assets/images/icon.png')}
                                    className="h-20 w-24"
                                    resizeMode="contain"
                                />
                                <Text className="text-white text-3xl font-semibold mt-4">Complete your account</Text>
                            </View>

                            <View className="space-y-6 gap-4">
                                <View>
                                    <Text className="text-gray-400 text-base mb-2">First name</Text>
                                    <TextInput
                                        className="w-full bg-[#101115] text-white py-5 px-4 rounded-lg"
                                        placeholderTextColor="#6b7280"
                                        placeholder="Your first name"
                                        value={firstName}
                                        onChangeText={setFirstName}
                                    />
                                </View>

                                <View>
                                    <Text className="text-gray-400 text-base mb-2">Last name</Text>
                                    <TextInput
                                        className="w-full bg-[#101115] text-white py-5 px-4 rounded-lg"
                                        placeholderTextColor="#6b7280"
                                        placeholder="Your last name"
                                        value={lastName}
                                        onChangeText={setLastName}
                                    />
                                </View>

                                <View>
                                    <Text className="text-gray-400 text-base mb-2">WhatsApp number</Text>
                                    <TextInput
                                        className="w-full bg-[#101115] text-white py-5 px-4 rounded-lg"
                                        placeholderTextColor="#6b7280"
                                        placeholder="Your WhatsApp number"
                                        keyboardType="phone-pad"
                                        value={whatsappNumber}
                                        onChangeText={setWhatsappNumber}
                                    />
                                </View>

                                <View>
                                    <Text className="text-gray-400 text-base mb-2">Password</Text>
                                    <View className="relative">
                                        <TextInput
                                            className="w-full bg-[#101115] text-white py-5 px-4 rounded-lg pr-12"
                                            placeholderTextColor="#6b7280"
                                            placeholder="Enter your password"
                                            secureTextEntry={!showPassword}
                                            value={password}
                                            onChangeText={setPassword}
                                        />
                                        <Pressable
                                            className="absolute right-4 top-4"
                                            onPress={() => setShowPassword(!showPassword)}
                                        >
                                            <Feather
                                                name={showPassword ? "eye-off" : "eye"}
                                                size={24}
                                                color="#6b7280"
                                            />
                                        </Pressable>
                                    </View>
                                </View>

                                <View className="flex-row items-start">
                                    <View className="w-6 h-6 rounded-full bg-teal-400 items-center justify-center mt-0.5">
                                        <Feather name="check" size={16} color="black" />
                                    </View>
                                    <Text className="ml-2 text-gray-400">
                                        Min. 8 characters, with
                                        <Text className="text-teal-400"> 1 uppercase</Text>,
                                        <Text className="text-teal-400"> 1 number</Text> and
                                        <Text className="text-teal-400"> 1 special character</Text>.
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Button
                                title="Create Account"
                                variant="primary"
                                onPress={handleCreateAccount}
                                className="mb-8 bg-white rounded-xl py-4 items-center w-[100%] "
                                textClassName='text-[16px] font-light text-black font-poppins'
                            />
                            <View className="flex-row justify-center">
                                <Text className="text-gray-400">Already have an account? </Text>
                                <Pressable onPress={() => router.push('/(onboarding)/login')}>
                                    <Text className="text-teal-400">Login</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}