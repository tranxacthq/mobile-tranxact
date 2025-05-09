import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const Index = () => {
  const router = useRouter()
  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = withTiming(1, { duration: 2000 })

    const timeout = setTimeout(() => {
      router.replace('/(home)')
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <View className='flex-1 items-center justify-center bg-black gap-4'>
      <Animated.Image
        source={require('../assets/images/tranxact.png')}
        resizeMode='contain'
        style={[{ width: 200, height: 50 }, animatedStyle]}
      />
      <View className='gap-1 flex-col'>
        <Text className='text-white text-2xl'>Crypto, Simplified.</Text>
        <Text className='text-white text-2xl text-center'>Power, Amplified.</Text>
      </View>
    </View>
  )
}

export default Index
