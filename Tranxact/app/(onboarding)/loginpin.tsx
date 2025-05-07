import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';

interface LoginpinProps {
    onPinComplete?: (pin: string) => void;
}

const Loginpin: React.FC<LoginpinProps> = ({ onPinComplete }) => {
    const [pin, setPin] = useState<string>('');
    const maxLength = 6;

    const handlePress = (num: string): void => {
        if (pin.length < maxLength) {
            const newPin = pin + num;
            setPin(newPin);

            if (newPin.length === maxLength && onPinComplete) {
                onPinComplete(newPin);
            }
        }
    };

    const handleBiometricAuth = async (): Promise<void> => {
        try {
            const available = await LocalAuthentication.hasHardwareAsync();
            if (!available) {
                alert('Biometric authentication is not available on this device');
                return;
            }

            const enrolled = await LocalAuthentication.isEnrolledAsync();
            if (!enrolled) {
                alert('No biometrics enrolled on this device');
                return;
            }

            const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
            const biometryType = await LocalAuthentication.getEnrolledLevelAsync();

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: Platform.OS === 'ios' ? 'Authenticate with Face ID' : 'Authenticate with Fingerprint',
                fallbackLabel: 'Use PIN instead'
            });

            if (result.success) {
                console.log('Authentication successful');
                if (onPinComplete) {
                    onPinComplete('biometric');
                }
            }
        } catch (error) {
            console.log('Authentication error:', error);
        }
    };

    const handleDelete = (): void => {
        setPin(prev => prev.slice(0, -1));
    };

    const renderPinDots = (): JSX.Element[] => {
        const dots: JSX.Element[] = [];
        for (let i = 0; i < maxLength; i++) {
            dots.push(
                <View
                    key={i}
                    className={`w-5 h-5 rounded-full mx-2.5 ${i < pin.length ? 'bg-white' : 'bg-gray-700'}`}
                />
            );
        }
        return dots;
    };

    // Platform specific biometric icon
    const renderBiometricIcon = (): JSX.Element => {
        if (Platform.OS === 'ios') {
            return <MaterialCommunityIcons name="face-recognition" size={28} color="white" />;
        } else {
            return <MaterialCommunityIcons name="fingerprint" size={28} color="white" />;
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-black items-center justify-center pt-16">
            <StatusBar barStyle="light-content" />
            <Text className="text-white text-3xl font-bold mb-2 font-poppins">Welcome Back</Text>
            <Text className="text-white text-[14px] mb-8">Enter your PIN to continue </Text>

            {/* PIN Dots */}
            <View className="flex-row mb-16">
                {renderPinDots()}
            </View>

            {/* Number Pad */}
            <View className="w-4/5">
                <View className="flex-row justify-between mb-6">
                    <TouchableOpacity
                        className="w-16 h-16 rounded-full flex justify-center items-center"
                        onPress={() => handlePress('1')}
                    >
                        <Text className="text-white text-3xl">1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-16 h-16 rounded-full flex justify-center items-center"
                        onPress={() => handlePress('2')}
                    >
                        <Text className="text-white text-3xl">2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-16 h-16 rounded-full flex justify-center items-center"
                        onPress={() => handlePress('3')}
                    >
                        <Text className="text-white text-3xl">3</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-between mb-6">
                    <TouchableOpacity
                        className="w-16 h-16 rounded-full flex justify-center items-center"
                        onPress={() => handlePress('4')}
                    >
                        <Text className="text-white text-3xl">4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-16 h-16 rounded-full flex justify-center items-center"
                        onPress={() => handlePress('5')}
                    >
                        <Text className="text-white text-3xl">5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-16 h-16 rounded-full flex justify-center items-center"
                        onPress={() => handlePress('6')}
                    >
                        <Text className="text-white text-3xl">6</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-between mb-6">
                    <TouchableOpacity
                        className="w-16 h-16 rounded-full flex justify-center items-center"
                        onPress={() => handlePress('7')}
                    >
                        <Text className="text-white text-3xl">7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-16 h-16 rounded-full flex justify-center items-center"
                        onPress={() => handlePress('8')}
                    >
                        <Text className="text-white text-3xl">8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-16 h-16 rounded-full flex justify-center items-center"
                        onPress={() => handlePress('9')}
                    >
                        <Text className="text-white text-3xl">9</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-between">
                    <TouchableOpacity
                        className="w-16 h-16 rounded-full flex justify-center items-center"
                        onPress={handleBiometricAuth}
                    >
                        {renderBiometricIcon()}
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-16 h-16 rounded-full flex justify-center items-center"
                        onPress={() => handlePress('0')}
                    >
                        <Text className="text-white text-3xl">0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-16 h-16 rounded-full flex justify-center items-center"
                        onPress={handleDelete}
                    >
                        <Text className="text-white text-3xl">✕</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Loginpin;