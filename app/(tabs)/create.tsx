import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { Video,ResizeMode } from 'expo-av'
import icons from '@/constants/icons'
import CustomButton from '@/components/CustomButton'
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';

// import * as DocumentPicker from "expo-document-picker"
 // or wherever it’s coming from
import useUploadVideo from '@/hooks/useUploadVideo'
import useGetCurrentUser from '@/hooks/useGetCurrentUser'

const Create = () => {
  const {data:userData}=useGetCurrentUser()
  const [video,setVideo]=useState<ImagePickerAsset| null>()
  const [title,setTitle]=useState("")
  const [prompt,setPrompt]=useState("")
  const [thumbnail,setThumbnail]=useState<ImagePickerAsset| null>()
const {mutate,isPending}=useUploadVideo()

  const handlePicker = async function(selectType:string){
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image"?ImagePicker.MediaTypeOptions.Images:ImagePicker.MediaTypeOptions.Videos,
   
      aspect: [4, 3],
      quality: 1,
    });

    

if(!result.canceled){

  if(selectType ==="image"){
    setThumbnail(result.assets[0])
  }
  if(selectType ==="video"){
    setVideo(result.assets[0])
  }

}else{
    setTimeout(()=>{
      Alert.alert("Document picked", JSON.stringify(result,null,2))
    },100)
  }

  }
  const handleSubmit = function(){
    const formData = {video,title,thumbnail,prompt,userId:userData?.$id}
    console.log(formData)
    if(!formData) return Alert.alert("please fill in all the fields")
      mutate(formData)
  }
  return (
    <SafeAreaView className='bg-primary flex-1'>
 <ScrollView contentContainerStyle={{paddingHorizontal:7}}>
<Text className='text-white font-semibold text-xl capitalize my-5'>upload video</Text>
<FormField title='video Title' changeText={(e)=>setTitle(e)} value={title} placeholder='Give your video a title' containerStyle="bg-gray-600 p-1 "/>

<Text className='text-white capitalize font-semibold mt-6 mb-2 font-pmedium '>upload a video</Text>
  <TouchableOpacity onPress={()=>handlePicker("video")}>
    {video?<Video isLooping resizeMode={ResizeMode.COVER}  shouldPlay
            useNativeControls source={{uri:video.uri}}     style={{ width: '100%', height: 300 }}/>:<View className='bg-gray-600 h-60 w-full rounded-lg justify-center items-center'>
      <View className='border-2 border-dashed border-secondary-default p-1'>
        <Image source={icons.upload} className='w-[25px] h-[25px]'/>
      </View>
      </View>}
  </TouchableOpacity>

  <Text className='text-white capitalize font-pmedium mt-6'>thumbnail image</Text>
  <TouchableOpacity onPress={()=>handlePicker("image")}>
    {thumbnail?<ImageBackground source={{uri:thumbnail.uri}} className='h-[80px] w-full' style={{width:"100%",height:200}}/>:<View className='bg-gray-600 h-14 w-full  flex-row rounded-lg  justify-center gap-x-2 items-center'>
     
        <Image source={icons.upload} className='w-[18px] h-[18px]'/>
  <Text className='text-white'>Choose a file</Text>
      </View>}
  </TouchableOpacity>

<FormField title='Ai Prompt' changeText={(e)=>setPrompt(e)} value={prompt} placeholder='The prompt you used to cvreate this video' containerStyle="bg-gray-600 p-1 "/>
<CustomButton isLoading={isPending} title='submit and publish' handlePress={handleSubmit} containerStyle='p-4 mt-8'/>
 </ScrollView>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({})

// {"prompt": "Ggg", "thumbnail": {"mimeType": "image/png", "name": "Screenshot_20250602-165338.png", "size": 68703, "uri": "file:///data/user/0/host.exp.exponent/cache/DocumentPicker/d5b84b67-1e67-4ea0-b241-0c053bedaaab.png"}, "title": "Ggg", "userId": "683e0b4500363675bf84", "video": {"mimeType": "video/mp4", "name": "screen-20250602-222352.mp4", "size": 15656386, "uri": "file:///data/user/0/host.exp.exponent/cache/DocumentPicker/d5e0e149-eae9-4900-b2d2-de4ab69b0aad.mp4"}}