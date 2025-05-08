import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/components/Button';

export default function VerificationScreen() {
    const { email } = useLocalSearchParams<{ email: string }>();

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(60);
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const containerRef = useRef<View>(null);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

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
        router.push(`/(onboarding)/completesignup?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otpValue)}`);
    };

    const handleResend = () => {
        setTimeLeft(60);
        console.log('Resending OTP to:', email);
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
                            <Text className="text-white text-3xl font-semibold">Verify your email</Text>
                        </View>

                        <View className="mt-16">
                            <Text className="text-gray-400 text-lg">
                                A 6 digit OTP code has been sent to
                            </Text>
                            <Text className="text-teal-400 text-lg">{displayEmail}</Text>
                            <Text className="text-gray-400 text-lg">enter the code to continue.</Text>
                        </View>

                        <View className="mt-12">
                            <Text className="text-gray-400 text-lg mb-4">Enter OTP</Text>
                            <TouchableOpacity
                                ref={containerRef}
                                onPress={handleContainerPress}
                                activeOpacity={1}
                                className="flex-row justify-between w-full"
                            >
                                {otp.map((digit, index) => (
                                    <View key={index} className="w-14 h-16 bg-[#101115] rounded-lg justify-center items-center">
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

                        <View className="items-center mt-12">
                            {timeLeft > 0 ? (
                                <Text className="text-gray-400 text-base">
                                    Resend code in <Text className="text-teal-400">{timeLeft} secs</Text>
                                </Text>
                            ) : (
                                <TouchableOpacity onPress={handleResend}>
                                    <Text className="text-teal-400 text-base">Resend</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <View className="mb-8">
                        <Button
                            title="Verify"
                            variant="primary"
                            onPress={handleVerify}
                            className="mb-10 bg-white rounded-xl py-4 items-center w-[100%] "
                            textClassName="text-[16px] font-poppins"
                        />
                        <View className="flex-row justify-center mt-8">
                            <Text className="text-gray-400">Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/(onboarding)/login')}>
                                <Text className="text-teal-400">Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
