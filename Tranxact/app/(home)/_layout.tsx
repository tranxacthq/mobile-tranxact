import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

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
                backgroundColor: '#1F1F1F',
                borderTopColor: '#1F1F1F',
                borderTopWidth: 0,
            },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#fff',
            tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: 'Poppins_400Regular',
                textTransform: 'capitalize',
                marginBottom: 5,
            },
            // tabBarIconStyle: {
            //     display: 'none',
            // },
            tabBarItemStyle: {
                padding: 0,
                margin: 0,
                borderRadius: 0,
                backgroundColor: 'transparent',
                borderTopColor: 'transparent',
                borderTopWidth: 0,
                borderBottomColor: 'transparent',
                borderBottomWidth: 0,
                borderLeftColor: 'transparent',
                borderLeftWidth: 0,
                borderRightColor: 'transparent',
                borderRightWidth: 0,
                borderWidth: 0,
                borderColor: 'transparent',
                borderStyle: 'solid',
                borderBottomLeftRadius: 0,
            }
        }} initialRouteName='index'>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Text style={{ color }}></Text>
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
                            <Text style={{ color }}></Text>
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
                            <Text style={{ color }}></Text>
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
                            <Text style={{ color }}></Text>
                        </View>
                    ),
                }}
            />
        </Tabs>
    )
}

export default HomeLayout