import { Alert, Image, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
// import { signUser } from '@/services/appwrite'
import useSignUp from '@/hooks/useSignUp'


const SignUp = () => {
  const [form,setform]=useState({email:"",passWord:"",userName:""})
  const { mutate, isPending, error } = useSignUp();
  const userName = form.userName
  const email = form.email
  const password = form.passWord
  
  const submit = function(){
    if(!email || !userName || !password) {
      Alert.alert("ERROR please fill in all the fields")
    }
    mutate({userName,email,password})
    // signUser({userName,email,password})
  }

  return (
    <SafeAreaView className='bg-primary flex-1'>
    <ScrollView >
      <View className='min-h-[85vh] px-4 w-full justify-center'>
<Image source={images.logo} className='w-[130px] h-[48px]' resizeMode='contain'/>
      <Text className=' text-white font-psemiBold font-semibold mt-10 text-2xl'>Sign up to vindy</Text>
      <FormField keyBoardType="name" otherStyles="my-2 pt-3" placeholder="enter your name" value={form.userName} title="username" changeText={(e:string)=>setform({...form,userName:e})}/>
      <FormField keyBoardType="email-address" otherStyles="my-2 " placeholder="enter your email" value={form.email} title="Email" changeText={(e:string)=>setform({...form,email:e})}/>
      <FormField value={form.passWord} title="password" placeholder="entyer your password" otherStyles="my-2 "  changeText={(e:string)=>setform({...form,passWord:e})}/>
             <CustomButton handlePress={submit} isLoading={isPending} title='submit' containerStyle='mt-6 py-4 tracking-wide' textStyle='text-xl'/>

             <View className='justify-center items-center mt-4 flex-row  gap-x-2'>
              <Text className='font-pregular text-lg capitalize text-gray-100'>dont have an account?</Text>
              <Link href="/sign-in" className='text-lg text-secondary-default capitalize'>sign in</Link>
             </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
