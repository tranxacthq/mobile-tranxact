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
      style={{flex: 1}}
    >
      <View className="flex-1 items-center justify-center relative">
        <View className="items-center mb-6">
          <Image
            source={require('../assets/images/icon.png')}
            className="h-[200px] w-[400px] mb-4"
            resizeMode="contain"
          />
        </View>

        <View className="absolute bottom-16 w-full px-8">
          <Button
            title="Login"
            variant="primary"
            onPress={() => router.back()}
            className="mb-20"
          />
        </View>
      </View>
    </LinearGradient>
  );
}