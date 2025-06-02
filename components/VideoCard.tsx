import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Models } from 'react-native-appwrite'
import icons from '@/constants/icons'
import { Video,ResizeMode } from 'expo-av'
interface videoType{
   item:Models.Document
}
const VideoCard = ({item:{title,thumbnail,video,creator:{userName,avatar},}}:videoType) => {
    const [play,setPlay]=useState(false)
  return (
    <View>
        <View className='flex-row justify-between items-center '>

        <View className='flex-row gap-x-2 items-center'>

        <Image source={{uri:avatar}} className='w-11 h-11 rounded-lg' resizeMode='contain'/>
        <View className='flex-col '>

      <Text className='text-gray-100 capitalize text-lg font-psemiBold font-semibold' numberOfLines={1}>{title}</Text>
      <Text className='text-gray-200 capitalize text-sm font-semibold' numberOfLines={1}>{userName}</Text>
        </View>
        </View>
        <Image source={icons.menu} className='w-5 h-5' resizeMode='contain'/>
        </View>

        <View className='h-[18rem] w-full mt-2 '>
     
   {  play?<Video    style={styles.video}
          useNativeControls
          source={{uri:video}}
          resizeMode={ResizeMode.CONTAIN}
          // onPlaybackStatusUpdate={(status)=>{if(status.didJustFinish){setPlay(false)}}}
          shouldPlay
          isLooping/> :  <TouchableOpacity onPress={()=>setPlay(true)} className='w-full h-full '>

        <Image source={{uri:thumbnail}} className='h-full w-full rounded-lg' resizeMode='cover'/>
        <Image source={icons.play} className='w-7 absolute h-7 right-[50%] left-[50%] top-[50%]' resizeMode='contain'/>
        </TouchableOpacity> }      
        </View>
    </View>
  )
}

export default VideoCard
const styles = StyleSheet.create({
    video: {
    width: "100%", // 52 * 4
    height: "100%", // 72 * 4
    borderRadius: 12,
  },
})
