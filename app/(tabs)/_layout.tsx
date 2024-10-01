import React from 'react'
import { Tabs } from 'expo-router'
import { primaryColor, routes } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { icontype } from '@/types'
import Header from '@/components/header'
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: '#686868',
        tabBarStyle: {
          gap: 0,
          height: 50,
          borderTopWidth: 1,
          borderTopColor: '#eee',
          shadowColor: '#fff',
          shadowOpacity: 0
        }
      }}>
      {
        routes.map(({ name, title, icon }) =>
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              header: (props) => <Header {...props} />,
              headerTitle: 'PDF Reader',
              tabBarIcon: ({ size, color, focused }) => <Ionicons name={focused ? icon.split('-outline')[0] as icontype : icon} size={size} color={color} />,
              tabBarLabel: title,
              tabBarLabelStyle: {
                fontSize: 14
              }
            }}
          />
        )
      }
    </Tabs>
  )
}