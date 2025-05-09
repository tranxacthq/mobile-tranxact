import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, SafeAreaView, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';

interface Asset {
    id: number;
    name: string;
    symbol: string;
    amount: number;
    value: number;
}
interface Coin {
    id: number;
    name: string;
    symbol: string;
    price: number;
    priceChangePercent: number;
    image: string;
}

interface ActionButtonProps {
    icon: string;
    title: string;
    background: string;
}

const CryptoCard = ({ coin }: { coin: Coin }) => {
    const isPositive = coin.priceChangePercent >= 0;

    return (
        <TouchableOpacity className="bg-gray-800 p-4 rounded-xl flex-row justify-between items-center mb-3 w-full">
            <View className="flex-row items-center">
                <Image
                    source={{ uri: coin.image }}
                    className="w-10 h-10 rounded-full"
                />
                <View className="ml-3">
                    <Text className="text-white font-bold text-lg">{coin.symbol.toUpperCase()}</Text>
                    <Text className="text-gray-400">{coin.name}</Text>
                </View>
            </View>
            <View className="items-end">
                <Text className="text-white font-bold text-lg">${coin.price.toLocaleString()}</Text>
                <View className="flex-row items-center">
                    <Text
                        className={isPositive ? "text-green-500" : "text-red-500"}
                    >
                        {isPositive ? "+" : ""}{coin.priceChangePercent.toFixed(2)}%
                    </Text>
                    <MaterialCommunityIcons
                        name={isPositive ? "arrow-up-thin" : "arrow-down-thin"}
                        size={16}
                        color={isPositive ? "#10B981" : "#EF4444"}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const WalletCard = ({ asset }: { asset: Asset }) => {
    return (
        <View className="bg-gray-800 p-4 rounded-xl mb-3">
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-teal-500 items-center justify-center">
                        <Text className="text-white font-bold">{asset.symbol.charAt(0)}</Text>
                    </View>
                    <View className="ml-3">
                        <Text className="text-white font-bold">{asset.symbol}</Text>
                        <Text className="text-gray-400 text-xs">{asset.name}</Text>
                    </View>
                </View>
                <View className="items-end">
                    <Text className="text-white font-bold">{asset.amount} {asset.symbol}</Text>
                    <Text className="text-gray-400">${asset.value.toLocaleString()}</Text>
                </View>
            </View>
        </View>
    );
};

const ActionButton = ({ icon, title, background }: ActionButtonProps) => {
    return (
        <TouchableOpacity className={`${background} p-4 rounded-xl items-center justify-center flex-1 mx-1`}>
            <FontAwesome5 name={icon} size={20} color="white" />
            <Text className="text-white mt-2">{title}</Text>
        </TouchableOpacity>
    );
};

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [showBalance, setShowBalance] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const trendingCoins = [
        { id: 1, name: 'Bitcoin', symbol: 'btc', price: 65432.10, priceChangePercent: 2.34, image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
        { id: 2, name: 'Ethereum', symbol: 'eth', price: 3521.47, priceChangePercent: -1.28, image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
        { id: 3, name: 'Solana', symbol: 'sol', price: 141.89, priceChangePercent: 5.62, image: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
        { id: 4, name: 'Cardano', symbol: 'ada', price: 0.45, priceChangePercent: -0.78, image: 'https://cryptologos.cc/logos/cardano-ada-logo.png' },
    ];

    const walletAssets = [
        { id: 1, name: 'Bitcoin', symbol: 'BTC', amount: 0.245, value: 16030.86 },
        { id: 2, name: 'Ethereum', symbol: 'ETH', amount: 3.12, value: 10986.99 },
        { id: 3, name: 'Solana', symbol: 'SOL', amount: 45.5, value: 6455.99 },
    ];

    const totalValue = walletAssets.reduce((sum, asset) => sum + asset.value, 0);

    return (
        <SafeAreaView className="flex-1 bg-black mb-[50px]">
            <StatusBar barStyle="light-content" />
            <ScrollView
                className="flex-1 px-2 pt-2"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#FFFFFF"
                    />
                }
            >
                <View className="flex-row justify-between items-center mb-6 mt-2">
                    <View className='flex-col gap-1'>
                        <Text className="text-gray-400">Welcome back</Text>
                        <Text className="text-white text-2xl font-bold">Alex Johnson</Text>
                    </View>
                    <TouchableOpacity className="w-10 h-10 bg-gray-800 rounded-full items-center justify-center">
                        <Ionicons name="notifications-outline" size={22} color="white" />
                    </TouchableOpacity>
                </View>

                <View className="bg-gray-900 p-5 rounded-xl mb-6 flex-col">
                    {
                        showBalance ? (
                            <TouchableOpacity onPress={() => setShowBalance(true)}>
                                <Text className="text-white text-4xl font-bold text-center">${totalValue.toLocaleString()}</Text>
                            </TouchableOpacity>

                        ) : (
                            <TouchableOpacity onPress={() => setShowBalance(true)}>
                                <Text className="text-white text-4xl font-bold text-center">*****</Text>
                            </TouchableOpacity>
                        )
                    }
                    <Text className="text-green-500 mb-4 mt-2 text-center">+12.4% ($3,245.80)</Text>

                    {/* Withdraw and Deposit Buttons */}
                    <View className="flex-row justify-center mt-2">
                        <TouchableOpacity className=" flex-row items-center justify-center py-3 px-6 rounded-lg mr-4">
                            <Feather name="arrow-down-circle" size={18} color="#3CC8C8" />
                            <Text className="text-[#3CC8C8] font-medium ml-2">Deposit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className=" flex-row items-center justify-center py-3 px-6 rounded-lg">
                            <Feather name="arrow-up-circle" size={18} color="white" />
                            <Text className="text-white font-medium ml-2">Withdraw</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row mb-6">
                    <ActionButton icon="arrow-up" title="Send" background="" />
                    <ActionButton icon="arrow-down" title="Receive" background="" />
                    <ActionButton icon="exchange-alt" title="Swap" background="" />
                </View>

                <View className="mb-6">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-white text-xl font-bold">Your Assets</Text>
                        <TouchableOpacity>
                            <Text className="text-teal-500">See All</Text>
                        </TouchableOpacity>
                    </View>

                    {walletAssets.map(asset => (
                        <WalletCard key={asset.id} asset={asset} />
                    ))}
                </View>

                <View className="mb-6">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-white text-xl font-bold">Trending Coins</Text>
                        <TouchableOpacity>
                            <Text className="text-teal-500">See All</Text>
                        </TouchableOpacity>
                    </View>

                    {trendingCoins.map(coin => (
                        <CryptoCard key={coin.id} coin={coin} />
                    ))}
                </View>

                <View className="mb-8">
                    <Text className="text-white text-xl font-bold mb-3">News & Updates</Text>

                    <TouchableOpacity className="bg-gray-800 p-4 rounded-xl mb-3">
                        <View className="flex-row items-center mb-2">
                            <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center">
                                <Text className="text-white font-bold">BTC</Text>
                            </View>
                            <Text className="text-gray-400 ml-2">Bitcoin • 1h ago</Text>
                        </View>
                        <Text className="text-white text-lg font-semibold mb-1">Bitcoin Surpasses $65K Once Again</Text>
                        <Text className="text-gray-400">Bitcoin has again surpassed the $65,000 mark as institutional investors continue to...</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-gray-800 p-4 rounded-xl">
                        <View className="flex-row items-center mb-2">
                            <View className="w-8 h-8 rounded-full bg-gray-700 items-center justify-center">
                                <Text className="text-white font-bold">M</Text>
                            </View>
                            <Text className="text-gray-400 ml-2">Market • 3h ago</Text>
                        </View>
                        <Text className="text-white text-lg font-semibold mb-1">Federal Reserve Signals No Rate Changes</Text>
                        <Text className="text-gray-400">The Federal Reserve has signaled no immediate changes to interest rates, causing crypto markets to...</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;