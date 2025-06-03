import { StyleSheet, Text, TouchableOpacity,  } from 'react-native'
import React from 'react'

type CustomButtonProps = {
  title: string;
  containerStyle?:string;
  textStyle?:string;
  handlePress?:()=>void;
  isLoading?:any
};


const CustomButton = function ({title,containerStyle,textStyle,handlePress,isLoading}:CustomButtonProps){
  return (
    <TouchableOpacity disabled={isLoading} onPress={handlePress} className={`bg-secondary-default ${containerStyle} ${isLoading&&"bg-black-default"} p-2 rounded-lg ${isLoading?"opacity-50":""}`} >
   <Text className={`text-primary font-semibold text-center ${textStyle} capitalize tracking-wide`}>{title}</Text>
    </TouchableOpacity>
  )
}


export default CustomButton

const styles = StyleSheet.create({})