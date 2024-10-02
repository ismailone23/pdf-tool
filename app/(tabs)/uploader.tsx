import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { usePage } from '@/context/pageContext'
import { limitofPdfTitle } from '@/constants'
import { handleFileUpload } from '@/lib'
import { extendedpic } from '@/types'

export default function Uploader() {
    const [isPicked, setIsPicked] = useState(false)
    const pagecon = usePage();
    if (!pagecon) return null
    const { setTitle, setCtxFiles } = pagecon
    const [files, setFiles] = useState<extendedpic[]>([])

    const handleUpload = async () => {
        return await handleFileUpload({ files, setFiles, setIsPicked, setCtxFiles })
    }

    return (
        <ScrollView className='h-full bg-white'>
            <View className='w-full px-2 py-1'>
                {(!isPicked) ?
                    <View className='w-full'>
                        <Text className='text-gray-800 text-lg'>Select File</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => handleUpload()}
                            className='w-full bg-gray-50 flex items-center justify-center h-52 border rounded-md border-gray-200 mt-2'>
                            <View className='flex items-center space-y-2'>
                                <Feather name='upload' size={30} />
                                <Text className='text-lg'>Upload File</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <View className='flex w-full'>
                        <Text className='mb-1 text-lg'>Actions</Text>
                        <View className='flex flex-row items-center gap-x-2'>
                            <TouchableOpacity activeOpacity={0.9}
                                onPress={() => handleUpload()}
                                className='bg-green-500/25 px-4 py-2 rounded' >
                                <Text className='text-base text-green-500'>
                                    <Feather name='upload' size={20} />
                                    More
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9}
                                onPress={() => {
                                    setFiles([]);
                                    setIsPicked(false)
                                }}
                                className='bg-red-500/25 px-4 py-2 rounded'>
                                <Text className='text-base text-red-500'>Clear</Text>
                            </TouchableOpacity>
                        </View>
                        <Text className='my-1 text-lg'>Recent Uploaded Pdf's</Text>
                        <View className='w-full flex flex-row flex-wrap gap-2'>
                            {
                                files.length > 0 && files.map((file, i) =>
                                    <View key={file.id} className='flex max-w-[130px] h-[130px] p-2 w-full'>
                                        <Image source={require('../../assets/images/pdfimage.png')} className='w-24 h-24' />
                                        <Link onPress={() => setTitle(file.name)} href={{
                                            pathname: '/pdf/[slug]',
                                            params: { slug: file.uri }
                                        }}>
                                            {files && <Text className='underline text-lg text-blue-500'>{((file.name).length > limitofPdfTitle) ?
                                                (((file.name).substring(0, limitofPdfTitle - 3)) + '...') :
                                                file.name}</Text>
                                            }
                                        </Link>
                                    </View>
                                )}
                            {files.length > 1 && <TouchableOpacity className='w-32 flex items-center justify-center h-32 border border-gray-300 rounded'>
                                <View className='flex items-center'>
                                    <Feather name='plus' color={'#1f2937'} size={24} />
                                    <Text className='text-gray-700'>Merge</Text>
                                </View>
                            </TouchableOpacity>}
                        </View>
                    </View>
                }
            </View>
        </ScrollView>
    )
}
