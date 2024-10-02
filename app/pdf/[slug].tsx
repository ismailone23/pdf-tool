import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableHighlight } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import Pdf from 'react-native-pdf';
import { usePage } from '@/context/pageContext';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function ViewPdf() {
    const { slug } = useLocalSearchParams();
    const uri: string = Array.isArray(slug) ? slug[0] : slug as string
    const pagecon = usePage();
    if (!pagecon) return null
    const { title } = pagecon

    const handlepdfadd = async () => {
        // const testpage = PDFPage.create().drawText('You can add new pages to a modified PDF as well!', {
        //     x: 5,
        //     y: 235,
        //     color: '#007386',
        // });

        // PDFDocument.create(uri).addPages([testpage]).write().then(stat => console.log(stat))
    }

    return (
        <View className='h-full w-full'>
            <View className='w-full p-2 bg-white overflow-clip mb-1 h-20 items-end flex flex-row'>
                <View className='flex items-center flex-row gap-x-3'>
                    <TouchableHighlight underlayColor={''}
                        onPress={() => router.back()}><Ionicons name='arrow-back' size={24} />
                    </TouchableHighlight>
                    <Text className='text-lg break-words font-medium'>{title.length > 25 ? title.substring(0, 25 - 3) + '....' + title.split('.')[title.split('.').length - 1] : title}</Text>
                    <TouchableHighlight onPress={handlepdfadd}><Feather name='plus-square' size={20} /></TouchableHighlight>
                </View>
            </View>
            <ScrollView className='h-full w-full'>
                <Pdf
                    trustAllCerts={false}
                    source={{ uri, cache: false }}
                    onPageSingleTap={(page, x, y) => {
                        console.log({ page, x, y });
                    }}
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
        height: (Dimensions.get('window').height - 120)
    }
})