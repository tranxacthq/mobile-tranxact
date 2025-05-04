import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: any;
}

const Index: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);
  const router = useRouter();

  const onboardingData: OnboardingItem[] = [
    {
      id: '1',
      title: 'Instant Crypto Transfers',
      description: "Grow your investments with Tranxact's tools designed to empower your financial journey.",
      image: require('../assets/images/instant_transfer.png'),
    },
    {
      id: '2',
      title: 'Real Time Tracking',
      description: "Grow your investments with Tranxact's tools designed to empower your financial journey.",
      image: require('../assets/images/real_time_tracking.png'),
    },
    {
      id: '3',
      title: 'Currency Swap in Seconds',
      description: "Grow your investments with Tranxact's tools designed to empower your financial journey.",
      image: require('../assets/images/currency_swap.png'),
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const navigateToNextSlide = (): void => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex + 1,
      });
    } else {
      router.push('/signup');
    }
  };

  const handleSignIn = (): void => {
    router.push('/login');
  };

  const renderItem = ({ item }: { item: OnboardingItem }): React.ReactElement => {
    return (
      <View className="w-screen items-center px-5 pt-16">
        <Image
          source={item.image}
          className="w-64 h-64"
          resizeMode="contain"
        />
        <Text className="text-white text-3xl font-bold text-center mt-10 mb-2">
          {item.title}
        </Text>
        <Text className="text-gray-200 text-center px-6 text-base leading-6">
          {item.description}
        </Text>
      </View>
    );
  };

  return (
      <LinearGradient
      colors={['#000000', '#1a1a2e', '#0c4a4e', '#000000']}
        style={{ flex: 1 }}
      locations={[0, 0.5, 0.7, 0.85]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="items-center mt-10 mb-5">
          <Image
            source={require('../assets/images/icon.png')}
            className="w-14 h-14"
            resizeMode="contain"
          />
        </View>

        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          keyExtractor={(item) => item.id}
        />

        <View className="flex-row justify-center my-8">
          {onboardingData.map((_, index) => (
            <View
              key={index}
              className={`h-2 mx-1 rounded-full ${index === currentIndex ? 'bg-teal-400 w-6' : 'bg-gray-500 w-2'
                }`}
            />
          ))}
        </View>

        <View className="px-5 pb-10">
          <TouchableOpacity
            className="bg-white py-4 rounded-lg items-center mb-4"
            onPress={navigateToNextSlide}
          >
            <Text className="text-black font-semibold text-lg">
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={handleSignIn}
          >
            <Text className="text-white text-base font-medium">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
  );
};

export default Index;