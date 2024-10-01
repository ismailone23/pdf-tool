import { routetype } from "@/types"
import { Ionicons } from "@expo/vector-icons"

export const routes: routetype[] = [
    {
        name: 'list',
        title: 'Files',
        icon: "document-text-outline",
    },
    {
        name: 'uploader',
        title: 'Upload',
        icon: "cloud-upload-outline",
    },
    {
        name: 'scan',
        title: 'Scaner',
        icon: "camera-outline"
    }
]
export const primaryColor = '#4493f8'

export const COUNT_KEY = 'count-key'
export const PDF_TRAY = 'pdf-tray'

export const limitofPdfTitle = 15