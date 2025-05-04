import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import Button from '@/components/Button';

export default function SignupScreen() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleCreateAccount = () => {
        if (!email.trim()) {
            alert("Please enter your email address");
            return;
        }
        router.push({
            pathname: '/verify',
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
                    <View className="px-6 flex-1 justify-between">
                        <View className="items-center mt-12">
                            <View className="h-[50px] w-[400px] mb-4">
                                <Image
                                    source={require('../assets/images/icon.png')}
                                    className="h-[50px] w-[400px] mb-4"
                                    resizeMode="contain"
                                />
                            </View>
                            <Text className="text-white text-3xl font-semibold mb-2">Let's create your account</Text>

                            <View className="w-full flex-row mt-2 mb-8">
                                <View className="h-1 flex-1 bg-teal-400 rounded-full" />
                                <View className="h-1 flex-1 bg-gray-600 rounded-full ml-1" />
                            </View>

                            <View className="w-full space-y-4 flex flex-col gap-[25px]">
                                <View>
                                    <Text className="text-gray-400 text-base mb-1">First name</Text>
                                    <TextInput
                                        className="w-full bg-[#101115] text-white py-4 px-4 rounded-lg"
                                        placeholder="Your first name"
                                        placeholderTextColor="#6b7280"
                                        value={firstName}
                                        onChangeText={setFirstName}
                                    />
                                </View>

                                <View>
                                    <Text className="text-gray-400 text-base mb-1">Last name</Text>
                                    <TextInput
                                        className="w-full bg-[#101115] text-white py-4 px-4 rounded-lg"
                                        placeholderTextColor="#6b7280"
                                        placeholder="Your last name"
                                        value={lastName}
                                        onChangeText={setLastName}
                                    />
                                </View>

                                <View>
                                    <Text className="text-gray-400 text-base mb-1">Email Address</Text>
                                    <TextInput
                                        className="w-full bg-[#101115] text-white py-4 px-4 rounded-lg"
                                        placeholderTextColor="#6b7280"
                                        placeholder="Your email address"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>

                                <View>
                                    <Text className="text-gray-400 text-base mb-1">Password</Text>
                                    <View className="w-full bg-[#101115] flex-row items-center rounded-lg">
                                        <TextInput
                                            className="flex-1 text-white py-4 px-4"
                                            placeholderTextColor="#6b7280"
                                            placeholder="Enter your password"
                                            secureTextEntry={!showPassword}
                                            value={password}
                                            onChangeText={setPassword}
                                        />
                                        <TouchableOpacity
                                            className="pr-4"
                                            onPress={() => setShowPassword(!showPassword)}
                                        >
                                            <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#6b7280" />
                                        </TouchableOpacity>
                                    </View>
                                    <View className="flex-row items-center mt-2">
                                        <View className="w-6 h-6 bg-teal-500 rounded-full items-center justify-center mr-2">
                                            <Feather name="check" size={16} color="white" />
                                        </View>
                                        <Text className="text-teal-400 text-sm">
                                            Min. 8 characters, with 1 uppercase, 1 number and 1 special character.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View className="mb-8 space-y-4">
                            <Button
                                title="Create Account"
                                variant="primary"
                                onPress={handleCreateAccount}
                                className="mb-10 bg-white rounded-xl py-4 items-center w-[100%] "
                                textClassName="text-[16px] font-poppins"
                            />

                            <View className="flex-row justify-center">
                                <Text className="text-gray-400">Already have an account? </Text>
                                <TouchableOpacity onPress={() => router.push('/login')}>
                                    <Text className="text-teal-400">Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}