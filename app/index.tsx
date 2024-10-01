import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Redirect, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COUNT_KEY } from '@/constants';


export default function Home() {
    const [prevdata, setPrevdata] = useState(1)
    useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem(COUNT_KEY);
                if (value == null) {
                    try {
                        await AsyncStorage.setItem(COUNT_KEY, String(prevdata));
                        setPrevdata(1)
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    setPrevdata(Number(value) + 1)
                    await AsyncStorage.setItem(COUNT_KEY, (Number(value) + 1).toString())
                }
            } catch (e) {
                console.log(e);
            }
        })()
    }, [])
    if (prevdata > 1) return <Redirect href={'/list'} />
    return (
        <SafeAreaView>
            <ScrollView>
                <View className='w-full min-h-[60vh] flex px-2 justify-end'>
                    <View className='items-center'>
                        <View className='gap-y-2 items-center flex w-full'>
                            <Text className='font-regular text-center text-xl'>A complete PDF Tool for students daily use</Text>
                            <Text className='font-medium'>Let's Start your journey with us</Text>
                        </View>
                        <TouchableOpacity className='w-44 mt-4 h-12 flex items-center justify-center rounded-full bg-[#4493f8]'
                            onPress={() => router.push('/list')}>
                            <Text className='text-white text-xl'>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}