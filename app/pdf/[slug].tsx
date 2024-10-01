import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableHighlight } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Pdf from 'react-native-pdf';
import { usePage } from '@/context/pageContext';
import { Ionicons } from '@expo/vector-icons';

export default function ViewPdf() {
    const { slug } = useLocalSearchParams();
    const uri: string = Array.isArray(slug) ? slug[0] : slug as string
    const pagecon = usePage();
    if (!pagecon) return null
    const { title } = pagecon
    return (
        <View className='h-full w-full'>
            <View className='w-full p-2 bg-white mb-2 h-24 items-end flex flex-row'>
                <View className='flex items-center flex-row gap-x-3'>
                    <TouchableHighlight underlayColor={''}
                        onPress={() => router.back()}><Ionicons name='arrow-back' size={24} />
                    </TouchableHighlight>
                    <Text className='text-lg font-medium'>{title}</Text>
                </View>
            </View>
            <ScrollView className='h-full w-full'>
                <Pdf
                    trustAllCerts={false}
                    source={{ uri, cache: true }}
                    style={styles.pdf}
                />
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height - 150)
    }
})