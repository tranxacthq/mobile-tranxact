import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const WalletLayout = () => {
    return (
        <Stack initialRouteName="index" >
            <Stack.Screen
                name="index"
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: 'red'
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#fff'
                    },
                    headerShadowVisible: false,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="deposit"
                options={{
                    title: 'Deposit',
                    headerStyle: {
                        backgroundColor: 'black'
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#fff'
                    },
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name="withdraw"
                options={{
                    title: 'Withdraw',
                    headerStyle: {
                        backgroundColor: 'black'
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#fff'
                    },
                    headerShadowVisible: false,
                }}
            />
        </Stack>
    )
}

export default WalletLayout