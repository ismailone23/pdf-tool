import React from 'react'
import { Stack } from 'expo-router'
import PageContextProvider from '@/context/pageContext'

export default function RootLayout() {
    return (
        <PageContextProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' />
                <Stack.Screen name='pdf/[slug]' />
                <Stack.Screen name='(tabs)' />
            </Stack>
        </PageContextProvider>
    )
}