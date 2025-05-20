import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const transactions: Transaction[] = [
    {
        id: "1",
        type: "received",
        amount: 250.00,
        description: "John Doe",
        date: "Today, 2:30 PM"
    },
    {
        id: "2",
        type: "sent",
        amount: 50.00,
        description: "Collin smith",
        date: "Yesterday, 5:45 PM"
    },
    {
        id: "3",
        type: "received",
        amount: 1000.00,
        description: "Smith Family",
        date: "May 15, 10:00 AM"
    },
    {
        id: "4",
        type: "sent",
        amount: 35.99,
        description: "Godwin Okwudili",
        date: "May 14, 12:00 AM"
    }
];

type BalanceSectionProps = {
    balance: number;
    showBalance: boolean;
    toggleBalanceVisibility: () => void;
};

type Transaction = {
    id: string;
    type: "received" | "sent";
    amount: number;
    description: string;
    date: string;
};

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    const isReceived = transaction.type === "received";

    return (
        <View className="p-3 rounded-lg bg-[#212125] mb-4">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <View className={`w-10 h-10 rounded-full items-center justify-center ${isReceived ? "bg-[#00A47833]" : "bg-[#E4484833]"}`}>
                        {isReceived ?
                            <MaterialIcons name="arrow-outward" size={18} color="green" /> :
                            <MaterialCommunityIcons name="arrow-bottom-left" size={18} color="red" />
                        }
                    </View>
                    <View className="ml-3">
                        <Text className="text-white font-medium">{transaction.description}</Text>
                        <Text className="text-gray-400 text-xs">{transaction.date}</Text>
                    </View>
                </View>
                <Text className={`font-bold ${isReceived ? "text-green-400" : "text-red-400"}`}>
                    {isReceived ? "+" : "-"}${transaction.amount.toFixed(2)}
                </Text>
            </View>

            <View className="flex-row justify-between mt-3 pl-2">
                <Text className="text-white font-medium">BTC</Text>
                <Text className="text-gray-400 text-sm font-medium">0.000004</Text>
            </View>
        </View>
    );
};


const BalanceSection = ({
    balance,
    showBalance,
    toggleBalanceVisibility
}: BalanceSectionProps) => {
    return (
        <View className="mx-4 rounded-xl p-2 mb-6">
            <View className="flex-row gap-2 mb-2">
                <Text className="text-[#6c757d] text-[16px] text-center">Current Balance</Text>
                <Pressable onPress={toggleBalanceVisibility}>
                    <MaterialCommunityIcons
                        name={showBalance ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color="gray"
                    />
                </Pressable>
            </View>

            <Text className="text-[#3CC8C8] text-5xl font-bold mt-1">
                {showBalance ? `$${balance.toFixed(2)}` : "••••••"}
            </Text>

            <View className="flex-row mt-6 justify-between">
                <Pressable
                    className="bg-white py-3 px-6 rounded-lg flex-1 mr-3 items-center"
                    onPress={() => router.push("/(home)/(wallet)/withdraw")}
                >
                    <Text className="text-black font-medium text-lg">Withdraw</Text>
                </Pressable>

                <Pressable
                    className="border border-gray-100 py-3 px-6 rounded-lg flex-1 ml-3 items-center"
                    onPress={() => router.push("/(home)/(wallet)/deposit")}
                >
                    <Text className="text-white font-medium text-lg">Deposit</Text>
                </Pressable>
            </View>
        </View>
    );
};
export default function Wallet() {
    const [showBalance, setShowBalance] = useState(true);
    const currentBalance = 3582.45;

    const toggleBalanceVisibility = () => {
        setShowBalance(prev => !prev);
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className=" pl-6 px-4 pt-2 pb-4">
                <Text className="text-white text-2xl">Wallet</Text>
            </View>
            <BalanceSection
                balance={currentBalance}
                showBalance={showBalance}
                toggleBalanceVisibility={toggleBalanceVisibility}
            />

            <View className="flex-1 px-4">
                <View className="flex-row justify-between items-center mb-3 p-2">
                    <Text className="text-white text-lg font-semibold">Transaction History</Text>
                    <Pressable className="flex-row items-center gap-2">
                        <Ionicons name="settings-outline" size={22} color="white" />
                    </Pressable>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {transactions.map(transaction => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                    <View className="h-6" />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}