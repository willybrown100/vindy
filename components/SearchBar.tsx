import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons';
import { router, usePathname } from 'expo-router';



interface formFieldProps{
    keyBoardType?:string;
    value?:string
    title?:string;
    // changeText?:(e:string)=>void;
    otherStyles?:string
    placeholder:string
 
}
const SearchBar = ({keyBoardType,value,otherStyles,placeholder}:formFieldProps) => {
    const [query,setSearchQuery]=useState("")
    const pathname = usePathname()
    console.log(pathname)

    const handleClick = function(){
      if(!query) return Alert.alert("please search for something")
if(pathname.includes("/search")) {
  router.setParams({ query })
}else{
  router.push({
    pathname: "/search/[query]",
    params: { query }
  });
}

    }
  return (
    <View className={`  my-3 ${otherStyles}`}>
     
        <View className='bg-black-100 border-2 flex-row relative items-center justify-between focus:border-secondary-default border-black-100 w-full rounded-xl '>
      < TextInput keyboardType={keyBoardType as any} value={query}  onChangeText={(e)=>setSearchQuery(e)} className={`text-white w-full py-3 font-psemiBold ${otherStyles}`} placeholder={placeholder} placeholderTextColor="#CDCDE0"/>
      <TouchableOpacity className='mr-2 absolute right-2 z-10' onPress={handleClick}>
        <Image source={icons.search} className='w-5 h-5 ' resizeMode='contain'/></TouchableOpacity>
        </View>
   
    </View>
  )
}

export default SearchBar

