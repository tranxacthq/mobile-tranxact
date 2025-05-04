import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, Image, TouchableWithoutFeedback, Keyboard, Clipboard } from 'react-native';
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
        // Handle paste of full OTP code
        if (value.length > 1) {
            // This might be a paste operation
            const pastedValue = value.slice(0, 6).split('');
            const newOtp = [...otp];

            for (let i = 0; i < 6; i++) {
                newOtp[i] = pastedValue[i] || '';
            }

            setOtp(newOtp);

            // Focus the last filled input or the next empty one
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
            // Move to next input when a digit is entered
            if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Handle backspace to go to previous input
        if (e.nativeEvent.key === 'Backspace') {
            const newOtp = [...otp];

            // If current field is empty and we're not at the first input, go to previous input
            if (otp[index] === '' && index > 0) {
                newOtp[index - 1] = '';
                setOtp(newOtp);
                if (inputRefs.current[index - 1]) {
                    inputRefs.current[index - 1]?.focus();
                }
            } else {
                // Clear current field
                newOtp[index] = '';
                setOtp(newOtp);
            }
        }
    };

    const handlePaste = async () => {
        try {
            const clipboardContent = await Clipboard.getString();
            if (clipboardContent && /^\d+$/.test(clipboardContent)) {
                // Only handle numeric content
                const pastedValue = clipboardContent.slice(0, 6).split('');
                const newOtp = [...otp];

                for (let i = 0; i < 6; i++) {
                    newOtp[i] = pastedValue[i] || '';
                }

                setOtp(newOtp);

                // Focus the last filled input
                const lastIndex = Math.min(pastedValue.length - 1, 5);
                if (inputRefs.current[lastIndex]) {
                    inputRefs.current[lastIndex]?.focus();
                }
            }
        } catch (error) {
            console.log('Failed to paste text: ', error);
        }
    };

    const handleContainerPress = () => {
        // Focus first empty input or the first input
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
    };

    const handleResend = () => {
        setTimeLeft(60);
        console.log('Resending OTP to:', email);
    };

    const displayEmail = email || "usmanndako@gmail.com";

    return (
        <SafeAreaView className="flex-1 bg-[#07070C]">
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className="px-6 flex-1">
                    <TouchableOpacity className="mt-4" onPress={() => router.back()}>
                        <Text className="text-white text-3xl">←</Text>
                    </TouchableOpacity>

                    <View className="items-center mt-8">
                        <View className="h-[50px] w-[400px] mb-4">
                            <Image
                                source={require('../assets/images/icon.png')}
                                className="h-[50px] w-[400px] mb-4"
                                resizeMode="contain"
                            />
                        </View>
                        <Text className="text-white text-3xl font-semibold mb-8">Verify your email</Text>

                        <View className="w-full flex-row mb-8">
                            <View className="h-1 flex-1 bg-teal-400 rounded-full" />
                            <View className="h-1 flex-1 bg-teal-400 rounded-full ml-1" />
                        </View>

                        <Text className="text-gray-400 text-lg text-center">
                            A 6 digit OTP code has been sent to
                        </Text>
                        <Text className="text-teal-400 text-lg mb-2">{displayEmail}</Text>
                        <Text className="text-gray-400 text-lg mb-8">enter the code to continue.</Text>


                        <View className="mb-8">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-gray-400 text-lg">Enter OTP</Text>
                                <TouchableOpacity onPress={handlePaste}>
                                    <Text className="text-teal-400 text-base">Paste Code</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                ref={containerRef}
                                onPress={handleContainerPress}
                                activeOpacity={1}
                                className="flex-row justify-between w-full"
                            >
                                {otp.map((digit, index) => (
                                    <View key={index} className="w-14 h-20 bg-[#101115] rounded-lg justify-center items-center mx-1">
                                        <TextInput
                                            ref={ref => {
                                                inputRefs.current[index] = ref;
                                            }}
                                            className="text-white text-2xl font-bold text-center w-full h-full"
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

                        <View className="flex-row justify-center items-center">
                            {timeLeft > 0 ? (
                                <>
                                    <Text className="text-gray-400 text-base">Resend code in </Text>
                                    <Text className="text-teal-400 text-base">{timeLeft} secs</Text>
                                </>
                            ) : (
                                <TouchableOpacity onPress={handleResend} className="flex-row">
                                    <Text className="text-gray-400 text-base">Tap to </Text>
                                    <Text className="text-teal-400 text-base">Resend</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <View className="flex-1 justify-end mb-8">
                        <Button
                            title="Verify"
                            variant="primary"
                            onPress={handleVerify}
                            className="mb-10 bg-white rounded-xl py-4 items-center w-[100%] "
                            textClassName="text-[16px] font-poppins"
                        />

                        <View className="flex-row justify-center mt-4">
                            <Text className="text-gray-400">Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/login')}>
                                <Text className="text-teal-400">Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}