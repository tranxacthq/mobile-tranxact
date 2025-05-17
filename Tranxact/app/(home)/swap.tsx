import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const cryptoAssets = [
    { id: "btc", symbol: "BTC", name: "Bitcoin", balance: 0.0042, price: 57300, icon: "🅱️" },
    { id: "eth", symbol: "ETH", name: "Ethereum", balance: 0.15, price: 3250, icon: "Ξ" },
    { id: "sol", symbol: "SOL", name: "Solana", balance: 2.5, price: 143, icon: "◎" },
    { id: "doge", symbol: "DOGE", name: "Dogecoin", balance: 310, price: 0.12, icon: "Ð" },
    { id: "usdt", symbol: "USDT", name: "Tether", balance: 120, price: 1, icon: "₮" },
];

type TokenSelectorProps = {
    visible: boolean;
    onClose: () => void;
    onSelect: (asset: typeof cryptoAssets[number]) => void;
    excludeToken: string;
};

const TokenSelector = ({ visible, onClose, onSelect, excludeToken }: TokenSelectorProps) => {
    if (!visible) return null;

    return (
        <View className="absolute inset-0 bg-black bg-opacity-90 z-10">
            <SafeAreaView className="flex-1">
                <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
                    <Text className="text-white text-xl font-bold">Select Token</Text>
                    <TouchableOpacity onPress={onClose}>
                        <MaterialIcons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 p-4">
                    {cryptoAssets
                        .filter(asset => asset.id !== excludeToken)
                        .map(asset => (
                            <TouchableOpacity
                                key={asset.id}
                                className="flex-row items-center py-3 border-b border-gray-800"
                                onPress={() => {
                                    onSelect(asset);
                                    onClose();
                                }}
                            >
                                <View className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center mr-3">
                                    <Text className="text-xl text-white">{asset.icon}</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white font-medium">{asset.name}</Text>
                                    <Text className="text-gray-400">{asset.symbol}</Text>
                                </View>
                                <Text className="text-white font-medium">
                                    {asset.balance} {asset.symbol}
                                </Text>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default function Swap() {
    const [fromToken, setFromToken] = useState(cryptoAssets[0]);
    const [toToken, setToToken] = useState(cryptoAssets[1]);
    const [fromAmount, setFromAmount] = useState("0.001");
    const [showFromTokens, setShowFromTokens] = useState(false);
    const [showToTokens, setShowToTokens] = useState(false);

    const calculateToAmount = () => {
        const amount = parseFloat(fromAmount) || 0;
        const rate = fromToken.price / toToken.price;
        return (amount * rate).toFixed(toToken.price < 1 ? 2 : 6);
    };

    const toAmount = calculateToAmount();

    const handleSwapTokens = () => {
        const temp = fromToken;
        setFromToken(toToken);
        setToToken(temp);
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="px-4 pt-2 pb-4">
                <Text className="text-white text-2xl">Swap</Text>
            </View>

            <ScrollView className="flex-1 px-4">
                <View className="bg-[#212125] rounded-xl p-4 mb-2">
                    <Text className="text-gray-400 mb-2">From</Text>

                    <View className="flex-row items-center justify-between mb-2">
                        <TextInput
                            className="text-white text-2xl font-bold flex-1"
                            value={fromAmount}
                            onChangeText={setFromAmount}
                            keyboardType="numeric"
                            placeholderTextColor="#4B5563"
                            placeholder="0.00"
                        />

                        <TouchableOpacity
                            className="flex-row items-center bg-gray-800 py-2 px-3 rounded-lg"
                            onPress={() => setShowFromTokens(true)}
                        >
                            <View className="w-8 h-8 rounded-full bg-gray-700 items-center justify-center mr-2">
                                <Text className="text-lg">{fromToken.icon}</Text>
                            </View>
                            <Text className="text-white font-medium mr-2">{fromToken.symbol}</Text>
                            <MaterialIcons name="keyboard-arrow-down" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-400">
                            Balance: {fromToken.balance} {fromToken.symbol}
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-blue-400">MAX</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="items-center my-2">
                    <TouchableOpacity
                        className="bg-gray-800 w-10 h-10 rounded-full items-center justify-center"
                        onPress={handleSwapTokens}
                    >
                        <MaterialIcons name="swap-vert" size={24} color="#60A5FA" />
                    </TouchableOpacity>
                </View>

                <View className="bg-[#212125] rounded-xl p-4 mb-6">
                    <Text className="text-gray-400 mb-2">To</Text>

                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-white text-2xl font-bold flex-1">
                            {toAmount}
                        </Text>

                        <TouchableOpacity
                            className="flex-row items-center bg-gray-800 py-2 px-3 rounded-lg"
                            onPress={() => setShowToTokens(true)}
                        >
                            <View className="w-8 h-8 rounded-full bg-gray-700 items-center justify-center mr-2">
                                <Text className="text-lg">{toToken.icon}</Text>
                            </View>
                            <Text className="text-white font-medium mr-2">{toToken.symbol}</Text>
                            <MaterialIcons name="keyboard-arrow-down" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-400">
                            Balance: {toToken.balance} {toToken.symbol}
                        </Text>
                    </View>
                </View>

                <View className="bg-[#212125] rounded-xl p-4 mb-6">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-400">Exchange Rate</Text>
                        <Text className="text-white">
                            1 {fromToken.symbol} = {(fromToken.price / toToken.price).toFixed(toToken.price < 1 ? 2 : 6)} {toToken.symbol}
                        </Text>
                    </View>

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-400">Network Fee</Text>
                        <Text className="text-white">0.0005 BTC</Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Slippage Tolerance</Text>
                        <Text className="text-white">0.5%</Text>
                    </View>
                </View>

                <TouchableOpacity className="bg-blue-600 py-4 rounded-xl items-center mb-6">
                    <Text className="text-white font-bold text-lg">Swap Now</Text>
                </TouchableOpacity>

                <View className="mb-6">
                    <Text className="text-white text-lg font-bold mb-3">Recent Swaps</Text>

                    <View className="bg-[#212125] rounded-xl p-4">
                        <View className="flex-row justify-between items-center mb-3">
                            <View className="flex-row items-center">
                                <View className="w-8 h-8 rounded-full bg-gray-700 items-center justify-center">
                                    <Text>🅱️</Text>
                                </View>
                                <Text className="text-white ml-2">BTC → ETH</Text>
                            </View>
                            <Text className="text-gray-400">2 hours ago</Text>
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="text-white">0.002 BTC</Text>
                            <Text className="text-white">0.035 ETH</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <TokenSelector
                visible={showFromTokens}
                onClose={() => setShowFromTokens(false)}
                onSelect={setFromToken}
                excludeToken={toToken.id}
            />

            <TokenSelector
                visible={showToTokens}
                onClose={() => setShowToTokens(false)}
                onSelect={setToToken}
                excludeToken={fromToken.id}
            />
        </SafeAreaView>
    );
}