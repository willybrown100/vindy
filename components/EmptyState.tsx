import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

interface stateType{
    title:string,
    subTitle:string
}
const handleClick = function(){
  router.push("/(tabs)/create")
}
const EmptyState = ({title,subTitle}:stateType) => {
  return (
    <View className='justify-center items-center w-full'>
      <Image source={images.empty} className='w-[150px] h-[120px]' resizeMode='contain'/>
      <Text className='text-white text-lg text-center capitalize font-psemiBold '>{title}</Text>
      <Text className='text-white text-sm font-pmedium'>{subTitle}</Text>
      <CustomButton title='create a video' containerStyle='mt-4 px-8 w-full' handlePress={handleClick}/>
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({})