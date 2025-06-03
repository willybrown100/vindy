import { ActivityIndicator, Alert, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'

import SearchBar from '@/components/SearchBar'
import TrendingVideo from '@/components/TrendingVideo'
import EmptyState from '@/components/EmptyState'
import useGetAllPost from '@/hooks/useGetAllPost'
import VideoCard from '@/components/VideoCard'
import useGetLatestPosts from '@/hooks/useGetLatestPosts'
import useGetCurrentUser from '@/hooks/useGetCurrentUser'

const Home = () => {
 const {data:latestPost}=useGetLatestPosts()
 const {data:userData}=useGetCurrentUser()
  const {data,isPending,error,isRefetching,refetch}=useGetAllPost()


if(error)return Alert.alert(error.message)
  return (
    <SafeAreaView className='bg-primary  px-4  flex-1' edges={['top']} >

    <FlatList

     data={data}
keyExtractor={(item)=>item?.$id?.toString()}
     renderItem={({item})=><VideoCard item={item}/>}
      ListHeaderComponent={()=> <View className=' my-4'>
      <View className='  justify-between items-center flex-row'>
    <View className='  '> 
<Text className='text-gray-100 font-pmedium '>welcome back</Text>
{isPending?< ActivityIndicator size={9} color="white"/>:<Text className='text-gray-100 font-psemiBold text-2xl font-bold tracking-wider'>{userData?.userName}</Text>}
    </View>
      <Image source={images.logoSmall} className='w-10 h-10' resizeMode='contain'/>
     
     </View>
     <SearchBar placeholder='search'/>

     <Text className='font-psemiBold text-gray-100 capitalize font-semibold text-lg'>lastest videos</Text>
  <TrendingVideo post={latestPost ?? []} />
      </View>
    }
    ListEmptyComponent={()=><EmptyState title='no videos found' subTitle='be the first one to upload a video'/>}
    refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
    />





    </SafeAreaView>
  )
}

export default Home

