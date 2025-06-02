import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { Video,ResizeMode } from 'expo-av'
import icons from '@/constants/icons'

const Create = () => {
  const [uploading,setUploadiong]=useState(false)
  const [form,setForm]=useState({title:"",video:null,prompt:"",thumnail:""})
  return (
    <SafeAreaView className='bg-primary flex-1'>
 <ScrollView contentContainerStyle={{paddingHorizontal:7}}>
<Text>upload a video</Text>
<FormField title='video Title' changeText={(e)=>setForm({...form,title:e})} value={form.title} placeholder='give your video a title'/>

<Text className='text-white capitalize font-semibold my-3'>upload a video</Text>
  <TouchableOpacity>
    {form.video?<Video isLooping resizeMode={ResizeMode.COVER} source={{uri:form.video.url}}/>:<View className='bg-gray-600 h-60 w-full rounded-lg justify-center items-center'>
      <View className='border-2 border-dashed border-secondary-default p-1'>
        <Image source={icons.upload} className='w-[25px] h-[25px]'/>
      </View>
      </View>}
  </TouchableOpacity>
 </ScrollView>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({})