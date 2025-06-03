import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import icons from '@/constants/icons';

interface formFieldProps{
    keyBoardType?:string;
    value:string
    title:string;
    changeText:(e:string)=>void
    otherStyles?:string
    placeholder:string
    containerStyle?:string
}
const FormField = ({keyBoardType,value,title,changeText,containerStyle,otherStyles,placeholder}:formFieldProps) => {
    const [showPassword,setShowPassword]=useState(false)
  return (
    <View className={`  my-3 ${otherStyles}`}>
        <Text className='text-gray-100 m-1 capitalize'>{title}</Text>
        <View className={`${containerStyle} bg-black-100 border-2 flex-row items-center justify-between focus:border-secondary-default border-black-100 w-full rounded-xl `}>
      < TextInput value={value} secureTextEntry={title === "password"&&!showPassword} onChangeText={changeText} className={`text-white w-full py-3 font-psemiBold ${otherStyles}`} placeholder={placeholder} placeholderTextColor="#7b7b8b"/>
      {title==="password" &&<TouchableOpacity className='mr-2 absolute right-2 z-10' onPress={()=>setShowPassword(!showPassword)}>
        <Image source={showPassword ? icons.eye:icons.eyeHide} className=' w-7 h-7 ' resizeMode='contain'/>
        </TouchableOpacity>}
        </View>
   
    </View>
  )
}

export default FormField
