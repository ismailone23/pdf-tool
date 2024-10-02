import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import * as DocumentPicker from 'expo-document-picker'

export type icontype = keyof typeof Ionicons.glyphMap
export type routetype = { name: string, title: string, icon: icontype }

export interface contextinterface {
    title: string
    setTitle: Dispatch<SetStateAction<string>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    ctxFiles: extendedpic[]
    setCtxFiles: Dispatch<SetStateAction<extendedpic[]>>
}

export type documentpicker = DocumentPicker.DocumentPickerAsset
export interface extendedpic extends documentpicker {
    id: number
}