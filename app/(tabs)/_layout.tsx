import { Image, StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from "../../constants/icons"
const TabBarIcon = function({icon,focused,name,color}:any){
return<View className='flex-col items-center justify-center gap-2'>
<Image source={icon} className='h-6 w-6' resizeMode='contain' tintColor={color}/>
{/* <Text  className={`${focused&&"font-semibold"}  text-xs`} style={{color:color}}>{name}</Text> */}
</View>
}
const TabLayout = () => {
  return (
    <>
    <Tabs screenOptions={{ tabBarActiveTintColor:"#FFA001", tabBarInactiveTintColor:"#CDCDE0", tabBarStyle:{
      backgroundColor:"#161622",  borderTopWidth: 0,
  elevation: 0,                 // Android
  shadowOpacity: 0,            // iOS
  shadowOffset: { height: 0, width: 0 }, // iOS
  shadowRadius: 0,             // iOS
    }}}>
  <Tabs.Screen 
    name="home" 
    options={{
      // tabBarStyle:{flexDirection:"row", display:"flex"},
      title: "Home",
      headerShown: false,
      tabBarIcon: ({ color, focused, size }) => (
        <TabBarIcon icon={icons.home} name="Home" focused={focused} color={color} size={size} />
      ),
    }}
  />
  <Tabs.Screen 
    name="bookmark" 
    options={{
      // tabBarStyle:{flexDirection:"row", display:"flex"},
      title: "Bookmark",
      headerShown: false,
      tabBarIcon: ({ color, focused, size }) => (
        <TabBarIcon icon={icons.bookmark} name="Bmark" focused={focused} color={color} size={size} />
      ),
    }}
  />
  <Tabs.Screen 
    name="create" 
    options={{
      // tabBarStyle:{flexDirection:"row", display:"flex"},
      title: "Create",
      headerShown: false,
      tabBarIcon: ({ color, focused, size }) => (
        <TabBarIcon icon={icons.plus} name="Create" focused={focused} color={color} size={size} />
      ),
    }}
  />
  <Tabs.Screen 
    name="profile" 
    options={{
      // tabBarStyle:{flexDirection:"row", display:"flex"},
      title: "Profile",
      headerShown: false,
      tabBarIcon: ({ color, focused, size }) => (
        <TabBarIcon icon={icons.profile} name="Profile" focused={focused} color={color} size={size} />
      ),
    }}
  />
</Tabs>

    </>
  )
}

export default TabLayout

const styles = StyleSheet.create({})