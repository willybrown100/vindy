import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
import useSignin from '@/hooks/useSignin'

const Signin = () => {
  const [form,setform]=useState({email:"",passWord:""})
  const email = form.email
  const password = form.passWord
  const {mutate,isPending}=useSignin()
  const submit = function(){
    mutate({email,password})
  }
  return (
    <SafeAreaView className='bg-primary flex-1'>
    <ScrollView >
      <View className='min-h-[85vh] px-4 w-full justify-center'>
<Image source={images.logo} className='w-[130px] h-[48px]' resizeMode='contain'/>
      <Text className=' text-white font-psemiBold font-semibold mt-10 text-2xl'>Sign in to vindy</Text>
      <FormField keyBoardType="email-address" otherStyles="my-2 " placeholder="enter your email" value={form.email} title="Email" changeText={(e:string)=>setform({...form,email:e})}/>
      <FormField value={form.passWord} title="password" placeholder="entyer your password" otherStyles="my-2 "  changeText={(e:string)=>setform({...form,passWord:e})}/>
             <CustomButton title='submit' handlePress={submit} isLoading={isPending} containerStyle='mt-6 py-4 tracking-wide' textStyle='text-xl'/>

             <View className='justify-center items-center mt-4 flex-row  gap-x-2'>
              <Text className='font-pregular text-lg capitalize text-gray-100'>dont have an account?</Text>
              <Link href="/signup" className='text-lg text-secondary-default capitalize'>sign up</Link>
             </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Signin

const styles = StyleSheet.create({})