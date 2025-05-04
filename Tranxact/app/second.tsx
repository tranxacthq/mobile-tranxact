import { Text, View, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import React from 'react';
import { router } from "expo-router";

export default function SeocndLoginPage() {
  return (
    <LinearGradient
      colors={['#000000', '#000000', '#EC368D', '#00BD9D', '#1A535C']}
      locations={[0, 0.5, 0.7, 0.85, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1 items-center justify-center relative">
        <View className="items-center mb-6">
          <Image
            source={require('../assets/images/icon.png')}
            className="h-[200px] w-[400px] mb-4"
            resizeMode="contain"
          />
        </View>
        
        <View className="absolute bottom-16 w-full flex flex-col items-center">
          <Text className="text-white text-3xl mb-10 font-neurial">Start your crypto portfolio.</Text>
          <Button
            title="Login"
            variant="primary"
            onPress={() => router.push('/login')}
            className="mb-20 bg-white rounded-xl py-4 items-center w-[90%] "
            textClassName="text-[16px] font-poppins"
          />
        </View>
      </View>
    </LinearGradient>
  );
}