import { View, Text, ScrollView, Pressable, StatusBar, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';

interface Asset {
    id: number;
    name: string;
    symbol: string;
    amount: number;
    value: number;
}

export interface ICoin {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    image: string;
    market_cap_rank: number;
}

interface ActionButtonProps {
    icon: string;
    title: string;
    background: string;
}

const EXCHANGE_RATES = {
    USD_TO_NGN: 1500,
};



const WalletCard = ({ asset, currency }: { asset: Asset, currency: 'USD' | 'NGN' }) => {
    const value = currency === 'USD'
        ? asset.value
        : asset.value * EXCHANGE_RATES.USD_TO_NGN;
    const currencySymbol = currency === 'USD' ? '$' : '₦';

    return (
        <View className="rounded-xl mb-3 p-2">
            <View className="flex-row justify-between items-center gap-2">
                <View className="flex-row items-center">
                    <View className="w-14 h-14 rounded-[8px] bg-[#2b2b2d] items-center justify-center">
                        <Text className="text-white font-bold">{asset.symbol.charAt(0)}</Text>
                    </View>
                    <View className="ml-3">
                        <Text className="text-white text-2xl">{asset.name}</Text>
                        <Text className=" text-gray-400">{asset.symbol}</Text>
                    </View>
                </View>
                <View className="items-end">
                    <Text className="text-white text-lg">{currencySymbol}{value.toLocaleString()}</Text>
                    <Text className="text-gray-400">{asset.amount} {asset.symbol}</Text>
                </View>
            </View>
        </View>
    );
};

const ActionButton = ({ icon, title, background }: ActionButtonProps) => {
    return (
        <Pressable className='flex-1 items-center justify-between p-0'>
            <View className='p-0 m-0 items-center'>
                <View className={`${background} rounded-xl w-[60px] h-[70px] items-center justify-center`}>
                    <FontAwesome5 name={icon} size={20} color="white" />
                </View>
                <Text className="text-white mt-2">{title}</Text>
            </View>
        </Pressable>
    );
};

const HomeScreen = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'NGN'>('USD');


    const walletAssets = [
        { id: 1, name: 'Bitcoin', symbol: 'BTC', amount: 0.245, value: 16030.86 },
        { id: 2, name: 'Ethereum', symbol: 'ETH', amount: 3.12, value: 10986.99 },
        { id: 3, name: 'Solana', symbol: 'SOL', amount: 45.5, value: 6455.99 },
    ];

    const getTotalValue = () => {
        const totalUSD = walletAssets.reduce((sum, asset) => sum + asset.value, 0);
        return selectedCurrency === 'USD' ? totalUSD : totalUSD * EXCHANGE_RATES.USD_TO_NGN;
    };

    const getCurrencySymbol = () => selectedCurrency === 'USD' ? '$' : '₦';

    const formatCurrencyValue = (value: number) => {
        return value.toLocaleString(undefined, {
            maximumFractionDigits: 2,
        });
    };

    const toggleCurrency = () => {
        setSelectedCurrency(selectedCurrency === 'USD' ? 'NGN' : 'USD');
    };


    const getProfitLossValue = () => {
        const profitUSD = 3245.80;
        return selectedCurrency === 'USD'
            ? profitUSD
            : profitUSD * EXCHANGE_RATES.USD_TO_NGN;
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />
            <ScrollView
                className="flex-1 px-2 pt-2"
            >
                <View className="py-5 rounded-xl mb-6 flex-col p-2">
                    <View className='flex-row items-center mb-4 justify-between p-2 '>
                        <View className='flex-row items-center gap-2'>
                            <Text className="text-[#6c757d] text-[16px] text-center">Current Balance</Text>
                            {
                                showBalance ? (
                                    <Pressable onPress={() => setShowBalance(false)}>
                                        <MaterialCommunityIcons name="eye-off-outline" size={18} color="gray" />
                                    </Pressable>
                                ) : (
                                    <Pressable onPress={() => setShowBalance(true)}>
                                        <MaterialCommunityIcons name="eye-outline" size={18} color="gray" />
                                    </Pressable>
                                )
                            }
                        </View>
                        <View className="flex-row items-center bg-[#212125] rounded-lg px-2 py-1">
                            <Pressable
                                onPress={toggleCurrency}
                                className="flex-row items-center"
                            >
                                <Text className="text-white font-bold mr-1">{selectedCurrency}</Text>
                                <MaterialCommunityIcons name="chevron-down" size={18} color="white" />
                            </Pressable>
                        </View>
                    </View>
                    {showBalance ? (
                        <Pressable onPress={() => setShowBalance(false)}>
                            <Text className="text-white text-5xl font-bold text-center">
                                {getCurrencySymbol()}{formatCurrencyValue(getTotalValue())}
                            </Text>
                        </Pressable>
                    ) : (
                        <Pressable onPress={() => setShowBalance(true)}>
                            <Text className="text-white text-4xl font-bold text-center">*****</Text>
                        </Pressable>
                    )}
                    <Text className="text-green-500 mb-4 mt-2 text-center">
                        +12.4% ({getCurrencySymbol()}{formatCurrencyValue(getProfitLossValue())})
                    </Text>

                    <View className="flex-row justify-center mt-2">
                        <Pressable className="flex-row items-center justify-center py-3 px-6 rounded-lg mr-4">
                            <Feather name="arrow-down-circle" size={18} color="#3CC8C8" />
                            <Text className="text-[#3CC8C8] font-medium ml-2">Deposit</Text>
                        </Pressable>
                        <Pressable className="flex-row items-center justify-center py-3 px-6 rounded-lg">
                            <Feather name="arrow-up-circle" size={18} color="white" />
                            <Text className="text-white font-medium ml-2">Withdraw</Text>
                        </Pressable>
                    </View>
                </View>

                <View className="flex-row mb-6 ">
                    <ActionButton icon="arrow-up" title="Send" background="bg-[#2b2b2d]" />
                    <ActionButton icon="arrow-down" title="Receive" background="bg-[#2b2b2d]" />
                    <ActionButton icon="exchange-alt" title="Swap" background="bg-[#2b2b2d]" />
                </View>

                <View className="mb-6 p-2">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-white text-2xl font-bold">Holdings</Text>
                        <Pressable>
                            <Text className="text-teal-500">See All</Text>
                        </Pressable>
                    </View>

                    {walletAssets.map(asset => (
                        <WalletCard key={asset.id} asset={asset} currency={selectedCurrency} />
                    ))}
                </View>

                <View className="mb-8 p-2">
                    <Text className="text-white text-2xl font-bold mb-3">Trending Markets</Text>

                    <Pressable className="bg-[#212125] p-4 rounded-xl mb-3">
                        <View className="flex-row items-center mb-2">
                            <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center">
                                <Text className="text-white font-bold">BTC</Text>
                            </View>
                            <Text className="text-gray-400 ml-2">Bitcoin • 1h ago</Text>
                        </View>
                        <Text className="text-white text-lg font-semibold mb-1">Bitcoin Surpasses $65K Once Again</Text>
                        <Text className="text-gray-400">Bitcoin has again surpassed the $65,000 mark as institutional investors continue to...</Text>
                    </Pressable>

                    <Pressable className="bg-[#212125] p-4 rounded-xl mb-8">
                        <View className="flex-row items-center mb-2">
                            <View className="w-8 h-8 rounded-full bg-gray-700 items-center justify-center">
                                <Text className="text-white font-bold">M</Text>
                            </View>
                            <Text className="text-gray-400 ml-2">Market • 3h ago</Text>
                        </View>
                        <Text className="text-white text-lg font-semibold mb-1">Federal Reserve Signals No Rate Changes</Text>
                        <Text className="text-gray-400">The Federal Reserve has signaled no immediate changes to interest rates, causing crypto markets to...</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;