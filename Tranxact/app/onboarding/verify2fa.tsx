import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/components/Button';
import * as Clipboard from 'expo-clipboard';
export default function Verify2faScreen() {
    const { email } = useLocalSearchParams<{ email: string }>();
    const [copiedText, setCopiedText] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const containerRef = useRef<View>(null);

    const handlePasteFromClipboard = async () => {
        try {
            const text = await Clipboard.getStringAsync();
            const cleanText = text.trim();

            if (/^\d{6}$/.test(cleanText)) {
                const newOtp = cleanText.split('');
                setOtp(newOtp);

                const lastIndex = Math.min(newOtp.length - 1, 5);
                inputRefs.current[lastIndex]?.focus();
            } else {
                alert('Clipboard does not contain a valid 6-digit code.');
            }
        } catch (error) {
            console.error('Failed to read clipboard:', error);
        }
    };


    const handleOtpChange = (value: string, index: number) => {
        if (value.length > 1) {
            const pastedValue = value.slice(0, 6).split('');
            const newOtp = [...otp];

            for (let i = 0; i < 6; i++) {
                newOtp[i] = pastedValue[i] || '';
            }

            setOtp(newOtp);
            const lastIndex = Math.min(pastedValue.length, 5);
            if (inputRefs.current[lastIndex]) {
                inputRefs.current[lastIndex]?.focus();
            }
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace') {
            const newOtp = [...otp];

            if (otp[index] === '' && index > 0) {
                newOtp[index - 1] = '';
                setOtp(newOtp);
                if (inputRefs.current[index - 1]) {
                    inputRefs.current[index - 1]?.focus();
                }
            } else {
                newOtp[index] = '';
                setOtp(newOtp);
            }
        }
    };

    const handleContainerPress = () => {
        for (let i = 0; i < 6; i++) {
            if (!otp[i]) {
                inputRefs.current[i]?.focus();
                return;
            }
        }
        inputRefs.current[0]?.focus();
    };

    const handleVerify = () => {
        const otpValue = otp.join('');
        console.log('Verifying OTP:', otpValue, 'for email:', email);
        router.push(`/onboarding/completesignup?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otpValue)}`);
    };


    const displayEmail = email || "usmanndako@gmail.com";

    return (
        <SafeAreaView className="flex-1 bg-[#07070C]">
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className="px-6 flex-1 justify-between">
                    <View>
                        <View className="flex-row items-center mt-6">
                            <TouchableOpacity onPress={() => router.back()} className="mr-4">
                                <Text className="text-white text-2xl">←</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='mt-8'>
                            <Text className="text-2xl font-bold mb-4 text-white text-center">Set Up Two-Factor Authentication</Text>

                        </View>
                        <View className="mt-16">
                            <Text className="text-gray-400 text-lg">
                                Enter the 6 digit code from your authenticator app to verify your account,
                                from your chosen 2FA app (Google Authenticator or others)
                            </Text>
                        </View>

                        <View className="mt-12">
                            <Text className="text-gray-400 text-lg mb-4">Enter 6 digit code </Text>
                            <TouchableOpacity
                                ref={containerRef}
                                onPress={handleContainerPress}
                                activeOpacity={1}
                                className="flex-row justify-between w-full"
                            >
                                {otp.map((digit, index) => (
                                    <View key={index} className="w-14 h-16 bg-[#F1F6F90A] rounded-lg justify-center items-center">
                                        <TextInput
                                            ref={ref => {
                                                inputRefs.current[index] = ref;
                                            }}
                                            className="text-white text-3xl font-bold text-center w-full h-full"
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            value={digit}
                                            onChangeText={(value) => handleOtpChange(value, index)}
                                            onKeyPress={(e) => handleKeyPress(e, index)}
                                            selectTextOnFocus
                                        />
                                    </View>
                                ))}
                            </TouchableOpacity>
                        </View>
                        <View className="items-center mt-12 border border-gray-600 rounded-lg py-6 flex justify-center">
                            <TouchableOpacity
                                onPress={handlePasteFromClipboard}
                                className=""
                            >
                                <Text className="text-teal-400 text-base">Paste from clipboard</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Button
                            title="Verify & Continue"
                            variant="primary"
                            onPress={handleVerify}
                            className="mb-10 bg-white rounded-xl py-4 items-center w-[100%] "
                            textClassName="text-[16px] font-poppins"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}