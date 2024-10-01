import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PDF_TRAY } from '@/constants'
import { extendedpic } from '@/types'

export default function List() {
    const [previousFiles, setPreviousFiles] = useState<extendedpic[]>([])
    useEffect(() => {
        (async () => {
            try {
                const traydata = await AsyncStorage.getItem(PDF_TRAY)
                if (!traydata) return
                const parsedata = JSON.parse(traydata) as extendedpic[]
                setPreviousFiles(parsedata)
            } catch (error) {
                console.log(error);
            }
        })()
    })

    return (
        <ScrollView className='w-full h-full bg-white'>
            <View className='w-full p-2'>
                {previousFiles.length > 0 ?
                    <View>
                        {previousFiles.map((file) =>
                            <View key={file.id}>
                                <Text>{file.name}</Text>
                            </View>
                        )
                        }
                    </View>
                    :
                    <Text className='text-gray-400 italic'>No pdf history found</Text>
                }
            </View>
        </ScrollView>
    )
}