import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

export default function index() {
    return (
        <SafeAreaView>
            <View>
                <Text>Home View / route</Text>
                <Link href={'list'} >continue</Link>
            </View>
        </SafeAreaView>
    )
}