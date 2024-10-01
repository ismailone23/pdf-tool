import { PDF_TRAY } from '@/constants';
import { extendedpic } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker'
import { Dispatch, SetStateAction } from 'react';
import { Platform } from 'react-native';

export const handleFileUpload = async ({
    setCsuri,
    setIsPicked,
    setFiles,
    files
}: {
    setCsuri: Dispatch<SetStateAction<string>>;
    setIsPicked: Dispatch<SetStateAction<boolean>>;
    setFiles: Dispatch<SetStateAction<extendedpic[]>>;
    files: extendedpic[];
}) => {
    setCsuri('');
    setIsPicked(files.length > 0)
    const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: false,
        multiple: true
    });
    if (result.canceled) return

    const filesarr = result.assets

    const xarr: extendedpic[] = []

    for (let i = 0; i < filesarr.length; i++) {
        const uri = encodeu(filesarr[i].uri)
        xarr.push({ ...filesarr[i], uri, id: Math.random() })
        xarr[0]
    }
    const newfiletray = [...files, ...xarr]
    setFiles(newfiletray)
    setIsPicked(true)
    try {
        const traydata = await AsyncStorage.getItem(PDF_TRAY)
        await AsyncStorage.setItem(PDF_TRAY, JSON.stringify(traydata ? [...newfiletray, ...JSON.parse(traydata) as extendedpic[]] : newfiletray))
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