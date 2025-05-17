import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch, Image } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const userData = {
    name: "Alex Johnson",
    email: "alex@example.com",
    profileImage: null,
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    kycVerified: true,
    twoFactorEnabled: true,
};

const settingsSections = [
    {
        title: "Account",
        icon: "person",
        iconType: "MaterialIcons",
        items: [
            { id: "personal", title: "Personal Information", icon: "person-outline" },
            { id: "payment", title: "Payment Methods", icon: "credit-card" },
            { id: "verification", title: "Identity Verification", icon: "verified-user" },
        ]
    },
    {
        title: "Security",
        icon: "shield",
        iconType: "MaterialIcons",
        items: [
            { id: "password", title: "Change Password", icon: "lock-outline" },
            { id: "2fa", title: "Two-Factor Authentication", icon: "security", toggle: true, value: userData.twoFactorEnabled },
            { id: "devices", title: "Manage Devices", icon: "devices" },
        ]
    },
    {
        title: "App Settings",
        icon: "settings",
        iconType: "MaterialIcons",
        items: [
            { id: "notifications", title: "Notifications", icon: "notifications-none" },
            { id: "appearance", title: "Appearance", icon: "color-lens" },
            { id: "currency", title: "Default Currency", icon: "attach-money" },
        ]
    },
    {
        title: "Support",
        icon: "help",
        iconType: "MaterialIcons",
        items: [
            { id: "help", title: "Help Center", icon: "help-outline" },
            { id: "contact", title: "Contact Support", icon: "support-agent" },
            { id: "feedback", title: "Send Feedback", icon: "feedback" },
        ]
    }
];

type User = {
    name: string;
    email: string;
    profileImage: string | null;
    walletAddress: string;
    kycVerified: boolean;
    twoFactorEnabled: boolean;
};

const ProfileHeader = ({ user }: { user: User }) => (
    <View className="bg-[#212125] rounded-xl p-6 mx-4 mb-6">
        <View className="flex-row items-center">
            {user.profileImage ? (
                <Image
                    source={{ uri: user.profileImage }}
                    className="w-16 h-16 rounded-full"
                />
            ) : (
                <View className="w-16 h-16 rounded-full bg-blue-600 items-center justify-center">
                    <Text className="text-white text-xl font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                </View>
            )}

            <View className="ml-4 flex-1">
                <Text className="text-white text-xl font-bold">{user.name}</Text>
                <Text className="text-gray-400">{user.email}</Text>
                {user.kycVerified && (
                    <View className="flex-row items-center mt-1">
                        <MaterialIcons name="verified" size={16} color="#3CC8C8" />
                        <Text className="text-blue-400 text-xs ml-1">Verified</Text>
                    </View>
                )}
            </View>

            <TouchableOpacity>
                <MaterialIcons name="edit" size={24} color="white" />
            </TouchableOpacity>
        </View>

        <View className="mt-4 p-3 rounded-lg">
            <View className="flex-row justify-between items-center">
                <Text className="text-gray-400 text-sm">Wallet Address</Text>
                <TouchableOpacity>
                    <MaterialIcons name="content-copy" size={18} color="#3CC8C8" />
                </TouchableOpacity>
            </View>
            <Text className="text-white mt-1" numberOfLines={1} ellipsizeMode="middle">
                {user.walletAddress}
            </Text>
        </View>
    </View>
);

type SettingsSectionProps = {
    section: {
        title: string;
        icon: string;
        iconType: string;
        items: Array<{
            id: string;
            title: string;
            icon: string;
            toggle?: boolean;
            value?: boolean;
        }>;
    };
    onToggle: (sectionTitle: string, itemId: string, value: boolean) => void;
};

const SettingsSection = ({ section, onToggle }: SettingsSectionProps) => (
    <View className="mx-4 mb-6">
        <View className="flex-row items-center mb-2">
            {section.iconType === "MaterialIcons" && (
                <MaterialIcons name={section.icon as any} size={20} color="#3CC8C8" />
            )}
            <Text className="text-white font-bold ml-2">{section.title}</Text>
        </View>

        <View className="bg-[#212125] rounded-xl overflow-hidden">
            {section.items.map((item, index) => (
                <TouchableOpacity
                    key={item.id}
                    className={`p-4 flex-row items-center justify-between ${index < section.items.length - 1 ? "border-b border-gray-800" : ""
                        }`}
                >
                    <View className="flex-row items-center">
                        <MaterialIcons name={item.icon as any} size={20} color="white" />
                        <Text className="text-white ml-3">{item.title}</Text>
                    </View>

                    {item.toggle ? (
                        <Switch
                            value={item.value}
                            onValueChange={(value) => onToggle(section.title, item.id, value)}
                            trackColor={{ false: "#4B5563", true: "#3CC8C8" }}
                            thumbColor={"white"}
                        />
                    ) : (
                        <MaterialIcons name="chevron-right" size={20} color="#4B5563" />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

export default function ProfileScreen() {
    const [settings, setSettings] = useState(settingsSections);

    const handleToggle = (sectionTitle: string, itemId: string, value: any) => {
        const updatedSettings = settings.map(section => {
            if (section.title === sectionTitle) {
                const updatedItems = section.items.map(item => {
                    if (item.id === itemId) {
                        return { ...item, value };
                    }
                    return item;
                });
                return { ...section, items: updatedItems };
            }
            return section;
        });

        setSettings(updatedSettings);
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-row justify-between items-center px-4 pt-2 pb-4">
                <Text className="text-white text-3xl">Profile</Text>
                <TouchableOpacity>
                    <MaterialIcons name="qr-code" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileHeader user={userData} />
                <View className="flex-row justify-between mx-4 mb-6">
                    <View className="bg-[#212125] flex-1 mr-2 p-4 rounded-xl">
                        <View className="flex-row items-center">
                            <View className="w-8 h-8 rounded-full bg-blue-900 items-center justify-center">
                                <FontAwesome5 name="coins" size={14} color="#3CC8C8" />
                            </View>
                            <Text className="text-white ml-2">Portfolio</Text>
                        </View>
                        <Text className="text-white text-xl font-bold mt-2">$4,582.24</Text>
                        <Text className="text-green-400 text-xs">+5.26% today</Text>
                    </View>

                    <View className="bg-[#212125] flex-1 ml-2 p-4 rounded-xl">
                        <View className="flex-row items-center">
                            <View className="w-8 h-8 rounded-full bg-purple-900 items-center justify-center">
                                <MaterialIcons name="history" size={16} color="#A78BFA" />
                            </View>
                            <Text className="text-white ml-2">Transactions</Text>
                        </View>
                        <Text className="text-white text-xl font-bold mt-2">28</Text>
                        <Text className="text-gray-400 text-xs">This month</Text>
                    </View>
                </View>

                {settings.map(section => (
                    <SettingsSection
                        key={section.title}
                        section={section}
                        onToggle={handleToggle}
                    />
                ))}
                <TouchableOpacity className="mx-4 mb-8 p-4 bg-[#212125] rounded-xl flex-row justify-center items-center">
                    <MaterialIcons name="logout" size={20} color="#EF4444" />
                    <Text className="text-red-500 font-medium ml-2">Sign Out</Text>
                </TouchableOpacity>

                <View className="items-center mb-8">
                    <Text className="text-gray-500 text-xs">App Version 1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}