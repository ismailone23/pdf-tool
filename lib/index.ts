import { PDF_TRAY } from '@/constants';
import { extendedpic } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker'
import { Dispatch, SetStateAction } from 'react';
import { Platform } from 'react-native';

export const handleFileUpload = async ({
    setIsPicked,
    setFiles,
    files,
    setCtxFiles
}: {
    setIsPicked: Dispatch<SetStateAction<boolean>>;
    setFiles: Dispatch<SetStateAction<extendedpic[]>>;
    setCtxFiles: Dispatch<SetStateAction<extendedpic[]>>;
    files: extendedpic[];
}) => {
    const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: false,
        multiple: true
    });
    if (result.canceled) return setIsPicked(files.length > 0 ? true : false)
    setIsPicked(true)
    const selectedFilesArr = result.assets
    const refinedArr: extendedpic[] = []
    for (let i = 0; i < selectedFilesArr.length; i++) {
        const encdoeuri = encodeu(selectedFilesArr[i].uri)
        refinedArr.push({ ...selectedFilesArr[i], id: Math.random(), uri: encdoeuri })
    }

    setFiles(p => ([...p, ...refinedArr]))

    try {
        const filesarrforstorage: extendedpic[] = [...refinedArr]
        const storagedata = await AsyncStorage.getItem(PDF_TRAY);
        if (storagedata) {
            filesarrforstorage.push(...JSON.parse(storagedata) as extendedpic[])
        }
        setCtxFiles(filesarrforstorage)
        await AsyncStorage.setItem(PDF_TRAY, JSON.stringify(filesarrforstorage))
    } catch (error) {
        console.log(error);
    }
}

const encodeu = (uri: string) => {
    if (Platform.OS === 'android') {
        if (uri.includes('file://')) return uri
        const encodeduri = encodeURI(`file://${uri}`)
        return encodeduri
    }
    else return uri
}