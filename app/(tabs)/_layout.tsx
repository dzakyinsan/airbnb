import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type TTabBarItems = {
  name: string,
  tabBarLabel: string,
  icon: (size: number, color: string) => ReactNode
}

const Layout = () => {

   const TabBarItems: TTabBarItems[] = [
    {
      name: 'index',
      tabBarLabel: 'Explore',
      icon: (size, color) => <Ionicons name='search' size={size} color={color} />
    },
    {
      name: 'wishlists',
      tabBarLabel: 'Wishlists',
      icon: (size, color) => <Ionicons name='heart-outline' size={size} color={color} />
    },
    {
      name: 'trips',
      tabBarLabel: 'Trips',
      icon: (size, color) => <FontAwesome5 name='airbnb' size={size} color={color} />
    },
    {
      name: 'inbox',
      tabBarLabel: 'Inbox',
      icon: (size, color) => <MaterialCommunityIcons name='message-outline' size={size} color={color} />
    },
    {
      name: 'profile',
      tabBarLabel: 'Profile',
      icon: (size, color) => <Ionicons name='person-circle-outline' size={size} color={color} />
    },
  ]
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: 'mon-sb'
      }
    }}>
      {TabBarItems.map(({ name, tabBarLabel, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarLabel,
            tabBarIcon: ({ color, size }) => icon(size, color)
          }} />
      ))}
    </Tabs>
  )
}

export default Layout