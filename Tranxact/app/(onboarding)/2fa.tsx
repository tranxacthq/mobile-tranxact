import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Alert, Image, Pressable, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';
const Setup2FA = () => {

    const handleSetup = () => {
        router.push('/(onboarding)/verify2fa');
    };

    return (
        <SafeAreaView className='flex-1 bg-[#07070C]'>
            <Pressable onPress={() => router.back()} className="mt-6 ml-4">
                <Text className="text-white text-2xl">←</Text>
            </Pressable>
            <View className="justify-center items-center p-8 gap-4">
                <Text className="text-2xl font-bold mb-4 text-white">Set Up Two-Factor Authentication</Text>
                <Text className="text-[12px] leading-6 mb-2 text-white ">
                    Open the downloaded 2FA app eg. Google Authentication app or Microsoft Authentication app,
                    Using the manual entry option copy and paste the set-up key below into the app to activate Two Factor Authentication for your account
                </Text>

                <View className='w-full py-4 border rounded-lg border-gray-300  mb-4 flex-row items-center justify-between gap-1  px-4'>
                    <View className='flex-col gap-1'>
                        <Text className='text-white'>set-up key</Text>
                        <Text className='text-white lowercase'>ABC123DEF456GHI789</Text>
                    </View>
                    <Button
                        title="Copy"
                        onPress={() => {
                            Alert.alert('Copied', 'Set-up key copied to clipboard');
                        }}
                        size='small'
                        textClassName='text-[12px] font-light text-black'
                        variant='primary'
                        className="rounded-lg px-6 items-center justify-center bg-teal-400 text-black"
                    />
                </View>
                <Text className="text-lg mb-2 text-white">Or scan this QrCode</Text>
                <Image
                    source={{ uri: 'data:image/png;base64,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' }}
                    style={{ width: 200, height: 200, marginBottom: 16 }}
                />
                <Button
                    title="Activate"
                    onPress={handleSetup}
                    className='w-full mt-10'
                    variant='primary'
                    textClassName='text-[16px] font-light text-black'
                />
            </View>
        </SafeAreaView>
    );
};

export default Setup2FA;
