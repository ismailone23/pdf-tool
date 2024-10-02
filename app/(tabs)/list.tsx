import { View, Text, ScrollView, TouchableHighlight, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PDF_TRAY } from '@/constants'
import { extendedpic } from '@/types'
import { usePage } from '@/context/pageContext'
import { Link } from 'expo-router'
import { Feather } from '@expo/vector-icons'

export default function List() {
    const [previousFiles, setPreviousFiles] = useState<extendedpic[]>([])
    const pagectx = usePage();
    if (!pagectx) return
    const { ctxFiles, setTitle, setCtxFiles } = pagectx
    useEffect(() => {
        (async () => {
            if (ctxFiles && ctxFiles.length > 0) { return setPreviousFiles(ctxFiles) }
            else {
                try {
                    const traydata = await AsyncStorage.getItem(PDF_TRAY)
                    if (!traydata) return
                    const parsedata = JSON.parse(traydata) as extendedpic[]
                    setPreviousFiles(parsedata)
                } catch (error) {
                    console.log(error);
                }
            }
        })()
    }, [ctxFiles])
    const handleremove = async (id: number) => {
        setCtxFiles(cfil => cfil.filter(fil => fil.id !== id))
        const tempasync = previousFiles.filter(f => f.id !== id)
        AsyncStorage.setItem(PDF_TRAY, JSON.stringify(tempasync))
    }
    return (
        <ScrollView className='w-full h-full bg-white'>
            <View className='w-full p-2 gap-y-2'>
                {previousFiles.length > 0 ?
                    <View>
                        <View className='text-gray-800 mb-1 w-full flex flex-row items-center justify-between italic'>
                            <Text className='italic text-gray-700'>Previously opend pdfs</Text>
                            <TouchableHighlight className='flex items-center'
                                onPress={async () => {
                                    await AsyncStorage.removeItem(PDF_TRAY);
                                    setPreviousFiles([]);
                                }}>
                                <Text className='text-red-500'>Clear All</Text>
                            </TouchableHighlight>
                        </View>
                        {previousFiles.map((file) =>
                            <View key={file.id}
                                className='justify-between w-full py-1 flex h-14 flex-row items-center'>
                                <View className='flex flex-row items-center'>
                                    <Image source={require('../../assets/images/pdfimage.png')}
                                        className='w-12 object-contain h-12 mr-1' />
                                    <Link onPress={() => setTitle(file.name)} href={{
                                        pathname: '/pdf/[slug]',
                                        params: { slug: file.uri }
                                    }} className='text-base'>{file.name.length > 30 ?
                                        file.name.substring(0, 30 - 3) + '....' + file.name.split('.')[file.name.split('.').length - 1] :
                                        file.name}
                                    </Link>
                                </View>
                                <TouchableHighlight underlayColor={''} onPress={() => handleremove(file.id)} className='flex items-center justify-center'>
                                    <Feather name='x' size={20} color={'red'} />
                                </TouchableHighlight>
                            </View>
                        )}
                    </View>
                    :
                    <Text className='text-gray-400 italic'>No pdf history found</Text>
                }
            </View>
        </ScrollView>
    )
}