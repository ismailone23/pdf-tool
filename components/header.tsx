import { View, Text } from 'react-native'
import React from 'react'
import { type BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

export default function Header(props: BottomTabHeaderProps) {
    return (
        <SafeAreaView className='bg-white border-b flex w-full p-2 border-gray-200'>
            <View className='flex items-center flex-row gap-x-2 w-full'>
                <Text className='text-lg font-medium'>PDF tool</Text>
                <Ionicons name='cog-outline' color={'#676767'} size={24} />
            </View>
        </SafeAreaView>
    )
}