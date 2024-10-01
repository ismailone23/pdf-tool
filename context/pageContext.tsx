import React, { createContext, ReactNode, useContext, useState } from 'react'
import { contextinterface } from '@/types'



export const PageContext = createContext<contextinterface | null>(null)

export default function PageContextProvider({ children }: { children: ReactNode }) {
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)

    const contextvalue = {
        title,
        setTitle,
        loading,
        setLoading
    }
    return (
        <PageContext.Provider value={contextvalue}>
            {children}
        </PageContext.Provider>
    )
}

export const usePage = () => {
    const context = useContext(PageContext)
    return context
}