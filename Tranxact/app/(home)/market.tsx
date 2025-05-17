import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data for market listings
const marketData = [
    {
        id: "btc",
        name: "Bitcoin",
        symbol: "BTC",
        price: 57302.64,
        change: 2.34,
        marketCap: "1.07T",
        volume: "27.5B",
        sparkline: "📈", // This would be replaced with actual chart component
        icon: "🅱️"
    },
    {
        id: "eth",
        name: "Ethereum",
        symbol: "ETH",
        price: 3254.12,
        change: -0.87,
        marketCap: "380.2B",
        volume: "12.3B",
        sparkline: "📉",
        icon: "Ξ"
    },
    {
        id: "sol",
        name: "Solana",
        symbol: "SOL",
        price: 143.76,
        change: 5.21,
        marketCap: "60.8B",
        volume: "3.8B",
        sparkline: "📈",
        icon: "◎"
    },
    {
        id: "ada",
        name: "Cardano",
        symbol: "ADA",
        price: 0.56,
        change: 1.08,
        marketCap: "18.9B",
        volume: "634.5M",
        sparkline: "📈",
        icon: "₳"
    },
    {
        id: "doge",
        name: "Dogecoin",
        symbol: "DOGE",
        price: 0.12,
        change: -2.54,
        marketCap: "15.8B",
        volume: "795.2M",
        sparkline: "📉",
        icon: "Ð"
    },
    {
        id: "dot",
        name: "Polkadot",
        symbol: "DOT",
        price: 7.45,
        change: 3.12,
        marketCap: "9.2B",
        volume: "455.7M",
        sparkline: "📈",
        icon: "●"
    },
    {
        id: "link",
        name: "Chainlink",
        symbol: "LINK",
        price: 15.86,
        change: 4.57,
        marketCap: "8.6B",
        volume: "538.1M",
        sparkline: "📈",
        icon: "⬡"
    },
];

// Market stats data
const marketStats = {
    totalMarketCap: "$2.53T",
    volume24h: "$98.7B",
    btcDominance: "42.3%",
    ethDominance: "15.1%",
    totalCryptos: "10,482"
};

// News data
const marketNews = [
    {
        id: "1",
        title: "Bitcoin breaks $57K as institutional demand surges",
        source: "CoinDesk",
        timeAgo: "2h ago"
    },
    {
        id: "2",
        title: "Ethereum layer-2 solutions see record transaction volume",
        source: "Cointelegraph",
        timeAgo: "4h ago"
    },
    {
        id: "3",
        title: "SEC approves new crypto ETF applications",
        source: "Bloomberg",
        timeAgo: "6h ago"
    }
];

type Coin = {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change: number;
    marketCap: string;
    volume: string;
    sparkline: string;
    icon: string;
};

const MarketListItem = ({ coin }: { coin: Coin }) => {
    return (
        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-800">
            <View className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center mr-3">
                <Text className="text-lg">{coin.icon}</Text>
            </View>

            <View className="flex-1">
                <View className="flex-row items-center">
                    <Text className="text-white font-medium mr-2">{coin.name}</Text>
                    <Text className="text-gray-400 text-xs">{coin.symbol}</Text>
                </View>
                <Text className="text-gray-400 text-xs">Market Cap: {coin.marketCap}</Text>
            </View>

            <View className="items-end">
                <Text className="text-white font-medium">
                    ${coin.price < 1 ? coin.price.toFixed(4) : coin.price.toFixed(2)}
                </Text>
                <View className="flex-row items-center">
                    <Text
                        className={`text-xs ${coin.change >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                        {coin.change >= 0 ? "+" : ""}{coin.change}%
                    </Text>
                    <Text className="ml-1">{coin.sparkline}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

type News = {
    id: string;
    title: string;
    source: string;
    timeAgo: string;
};

const NewsItem = ({ item }: { item: News }) => {
    return (
        <TouchableOpacity className="p-3 bg-gray-900 rounded-lg mb-3">
            <Text className="text-white font-medium mb-1">{item.title}</Text>
            <View className="flex-row justify-between">
                <Text className="text-gray-400 text-xs">{item.source}</Text>
                <Text className="text-gray-400 text-xs">{item.timeAgo}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default function Market() {
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [timePeriod, setTimePeriod] = useState("24h");

    // Filter coins based on search and active tab
    const filteredCoins = marketData.filter(coin => {
        const matchesSearch =
            coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === "all") return matchesSearch;
        if (activeTab === "gainers") return matchesSearch && coin.change > 0;
        if (activeTab === "losers") return matchesSearch && coin.change < 0;

        return matchesSearch;
    });

    return (
        <SafeAreaView className="flex-1 bg-black">
            {/* Header */}
            <View className="px-4 pt-2 pb-4">
                <Text className="text-white text-2xl font-bold">Market</Text>
            </View>

            {/* Market Stats Carousel */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-4 mb-4"
            >
                <View className="bg-gray-900 rounded-lg p-3 mr-3">
                    <Text className="text-gray-400 text-xs">Market Cap</Text>
                    <Text className="text-white font-medium">{marketStats.totalMarketCap}</Text>
                </View>

                <View className="bg-gray-900 rounded-lg p-3 mr-3">
                    <Text className="text-gray-400 text-xs">24h Volume</Text>
                    <Text className="text-white font-medium">{marketStats.volume24h}</Text>
                </View>

                <View className="bg-gray-900 rounded-lg p-3 mr-3">
                    <Text className="text-gray-400 text-xs">BTC Dominance</Text>
                    <Text className="text-white font-medium">{marketStats.btcDominance}</Text>
                </View>

                <View className="bg-gray-900 rounded-lg p-3 mr-3">
                    <Text className="text-gray-400 text-xs">ETH Dominance</Text>
                    <Text className="text-white font-medium">{marketStats.ethDominance}</Text>
                </View>

                <View className="bg-gray-900 rounded-lg p-3">
                    <Text className="text-gray-400 text-xs">Cryptos</Text>
                    <Text className="text-white font-medium">{marketStats.totalCryptos}</Text>
                </View>
            </ScrollView>

            {/* Search Bar */}
            <View className="px-4 mb-4">
                <View className="bg-gray-800 rounded-lg flex-row items-center px-3 py-2">
                    <MaterialIcons name="search" size={20} color="#9CA3AF" />
                    <TextInput
                        className="flex-1 text-white ml-2"
                        placeholder="Search coins..."
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery("")}>
                            <MaterialIcons name="close" size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Filter Tabs */}
            <View className="flex-row px-4 mb-2">
                <TouchableOpacity
                    className={`mr-4 pb-2 ${activeTab === "all" ? "border-b-2 border-blue-500" : ""}`}
                    onPress={() => setActiveTab("all")}
                >
                    <Text className={`${activeTab === "all" ? "text-blue-500" : "text-gray-400"}`}>
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`mr-4 pb-2 ${activeTab === "gainers" ? "border-b-2 border-green-500" : ""}`}
                    onPress={() => setActiveTab("gainers")}
                >
                    <Text className={`${activeTab === "gainers" ? "text-green-500" : "text-gray-400"}`}>
                        Gainers
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`mr-4 pb-2 ${activeTab === "losers" ? "border-b-2 border-red-500" : ""}`}
                    onPress={() => setActiveTab("losers")}
                >
                    <Text className={`${activeTab === "losers" ? "text-red-500" : "text-gray-400"}`}>
                        Losers
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`mr-4 pb-2 ${activeTab === "watchlist" ? "border-b-2 border-yellow-500" : ""}`}
                    onPress={() => setActiveTab("watchlist")}
                >
                    <Text className={`${activeTab === "watchlist" ? "text-yellow-500" : "text-gray-400"}`}>
                        Watchlist
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Time Period Filter */}
            <View className="flex-row px-4 mb-4">
                {["24h", "7d", "30d", "1y"].map(period => (
                    <TouchableOpacity
                        key={period}
                        className={`py-1 px-3 rounded-full mr-2 ${timePeriod === period ? "bg-blue-600" : "bg-gray-800"
                            }`}
                        onPress={() => setTimePeriod(period)}
                    >
                        <Text className={`text-xs ${timePeriod === period ? "text-white" : "text-gray-400"
                            }`}>
                            {period}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Coin Listings */}
            <View className="flex-1 px-4">
                <ScrollView className="flex-1">
                    {filteredCoins.map(coin => (
                        <MarketListItem key={coin.id} coin={coin} />
                    ))}

                    {/* Market News Section */}
                    <View className="mt-6 mb-4">
                        <Text className="text-white text-lg font-bold mb-3">Market News</Text>
                        {marketNews.map(item => (
                            <NewsItem key={item.id} item={item} />
                        ))}
                    </View>

                    {/* Add some padding at the bottom for better scrolling */}
                    <View className="h-6" />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}