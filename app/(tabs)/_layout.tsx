import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '@/components/tabBar'
import { routes } from '@/constants'
export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      {
        routes.map(({ name, header }) =>
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              headerTitle: header
            }}
          />
        )
      }
    </Tabs>
  )
}