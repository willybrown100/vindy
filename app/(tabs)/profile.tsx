import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoCard from '@/components/VideoCard'
import { Ionicons } from "@expo/vector-icons"
import images from '@/constants/images'

import EmptyState from '@/components/EmptyState'

import { useGlobalContext } from '@/GlobalContextProvider'
import useGetUserPost from '@/hooks/useGetUserPost'
import useLogout from '@/hooks/useLogout'
import useGetCurrentUser from '@/hooks/useGetCurrentUser'
import AsyncStorage from '@react-native-async-storage/async-storage'


// const userId = await AsyncStorage.getItem('userId');

const  Profile = () => {

 const {data:userData}=useGetCurrentUser()
const {mutate,isPending:isLoggingOut}=useLogout()
const userId = userData?.$id ?? ""
const { data,isPending:isLoadingPost } = useGetUserPost(userId);

console.log(userData?.$id)

  
const handleLogout = async function(){
mutate()


}


  return (
      <SafeAreaView className='bg-primary  px-4  flex-1' edges={['top']} >
    <FlatList

     data={data}
keyExtractor={(item)=>item?.$id?.toString()}
     renderItem={({item})=><VideoCard item={item}/>}
      ListHeaderComponent={()=> <View>
        <Pressable className='items-end justify-end mr-3 mt-2' onPress={handleLogout}>

{isLoggingOut? <ActivityIndicator size="large" color="white"/> :<Ionicons name='log-out' className='' color="red" size={28}/>}
        </Pressable>
<View  className='justify-center items-center'>

 <View className='border-[1px] mt-3 border-secondary-default p-1 rounded-lg'>

    <Image source={{uri:userData?.avatar}} className='w-14 h-14 rounded-lg'/>
 </View>
 <Text className='text-white font-semibold my-2'>{userData?.userName}</Text>
<View className='flex-row justify-between gap-x-12 my-4'>
  <View className='items-center justify-center'>

  <Text className='text-white my-0 font-bold text-[20px]'>{data?.length}</Text>
  <Text className='text-white my-0'>posts</Text>
  </View>
  <View className='flex-col justify-center items-center'>
  <Text className='text-white font-bold text-[20px]'>1.2k</Text>
  <Text className='text-white'> followers </Text>
  </View>
</View>
      </View>
      {isLoadingPost && (
        <View className='my-8 items-center justify-center'>
             <ActivityIndicator size='large' color='white' />
           </View>
         )}
</View>


    }
    ListEmptyComponent={()=><EmptyState title='no videos found' subTitle='be the first one to upload a video'/>}
   
    />





    </SafeAreaView>
  )
}

export default  Profile

const styles = StyleSheet.create({})




