import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons, AntDesign, Octicons, Ionicons } from '@expo/vector-icons';

const HomeLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                backgroundColor: 'rgba(31, 31, 31, 0.96)',
                borderTopWidth: 0,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0,
                shadowRadius: 0,
            },
            tabBarActiveTintColor: '#3CC8C8',
            tabBarInactiveTintColor: '#fff',
            tabBarItemStyle: {
                borderRadius: 20,
                marginHorizontal: 5,
            },
        }} initialRouteName='index'>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <View>
                            <MaterialCommunityIcons name='home' color={color} size={20} />
                        </View>
                    ),
                    headerRight: () => (
                        <View className="">
                            <Pressable className="w-10 h-10 rounded-full items-center justify-center">
                                <Ionicons name="notifications-outline" size={22} color="white" />
                            </Pressable>
                        </View>
                    ),
                    headerLeft: () => (
                        <View className="">
                            <View className='flex-row gap-1 ml-4'>
                                <Text className="text-white text-2xl font-bold">Hello,</Text>
                                <Text className="text-white text-2xl font-bold">Alex Johnson</Text>
                            </View>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: 'black'
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle: ''
                }}
            />
            <Tabs.Screen
                name='(wallet)'
                options={{
                    title: 'Wallet',
                    tabBarIcon: ({ color }) => (
                        <View>
                            <MaterialCommunityIcons name='wallet' color={color} size={20} />
                        </View>
                    ),

                    headerLeft: () => (
                        <View className="ml-3">
                            <Text className="text-white text-2xl font-bold">Wallet</Text>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: 'black'
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle: '',
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name='swap'
                options={{
                    title: 'Swap',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <View>
                            <AntDesign name='swap' color={color} size={20} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name='market'
                options={{
                    title: 'Market',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Octicons name="graph" size={16} color={color} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <View>
                            <AntDesign name='user' color={color} size={20} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    )
}

export default HomeLayout