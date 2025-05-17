import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons, AntDesign, Octicons } from '@expo/vector-icons';

const HomeLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                backgroundColor: 'rgba(31, 31, 31, 0.98)',
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
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <View>
                            <MaterialCommunityIcons name='home' color={color} size={20} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name='wallet'
                options={{
                    title: 'Wallet',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <View>
                            <MaterialCommunityIcons name='wallet' color={color} size={20} />
                        </View>
                    ),
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