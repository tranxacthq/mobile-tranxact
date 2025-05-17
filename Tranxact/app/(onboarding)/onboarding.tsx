import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Text, Image, Pressable, Dimensions, FlatList, SafeAreaView, StatusBar } from 'react-native';

interface SlideItem {
  id: string;
  title: string;
  description: string;
  image: any;
}

const slides: SlideItem[] = [
  {
    id: '1',
    title: 'Instant Crypto Transfers',
    description: "Grow your investments with Tranxact's tools designed to empower your financial journey.",
    image: require('../../assets//images/instant_transfer.png'), // Assuming images are in assets folder
  },
  {
    id: '2',
    title: 'Real Time Tracking',
    description: "Grow your investments with Tranxact's tools designed to empower your financial journey.",
    image: require('../../assets/images/real_time_tracking.png'),
  },
  {
    id: '3',
    title: 'Currency Swap in Seconds',
    description: "Grow your investments with Tranxact's tools designed to empower your financial journey.",
    image: require('../../assets/images/currency_swap.png'),
  },
];

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: SlideItem }) => {
    return (
      <View className="flex-1 items-center justify-center gap-6 bg-black" style={{ width }}>
        <View className="justify-center items-center">
          <Image
            source={item.image}
            resizeMode="contain"
            style={{ width: 350, height: 250 }}
          />
        </View>
        <View className="px-6">
          <Text className="text-white text-3xl font-bold mb-4 text-center">
            {item.title}
          </Text>
          <Text className="text-white text-center text-lg mt-[20px]">
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderPagination = () => {
    return (
      <View className="flex-row justify-center mt-4 mb-8">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-2 mx-1 rounded-full ${index === currentIndex ? 'bg-teal-400' : 'bg-white'}`}
            style={{ width: index === currentIndex ? 24 : 8 }}
          />
        ))}
      </View>
    );
  };

  const showButtons = currentIndex === slides.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          viewabilityConfig={viewConfigRef.current}
        />

        <View className="absolute bottom-12 w-full">
          {renderPagination()}

          {showButtons && (
            <View className="px-6">
              <Pressable
                className="bg-white py-4 rounded-lg mb-4"
                onPress={() => router.push('/(onboarding)/signup')}
              >
                <Text className="text-black text-center font-bold text-lg">
                  Get Started
                </Text>
              </Pressable>

              <Pressable
                className="py-2"
                onPress={() => router.push('/(onboarding)/login')}
              >
                <Text className="text-white text-center text-lg">
                  Sign In
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;