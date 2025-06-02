import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import useSearch from '@/hooks/useSearch'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoCard from '@/components/VideoCard'
import images from '@/constants/images'

import EmptyState from '@/components/EmptyState'
import SearchBar from '@/components/SearchBar'

const  Search = () => {
  const {query}=useLocalSearchParams()
  const safeQuery = Array.isArray(query) ? query[0] : query;
const { data } = useSearch(safeQuery);
console.log(data)
console.log(safeQuery)

  return (
      <SafeAreaView className='bg-primary  px-4  flex-1' edges={['top']} >

    <FlatList

     data={data}
keyExtractor={(item)=>item?.$id?.toString()}
     renderItem={({item})=><VideoCard item={item}/>}
      ListHeaderComponent={()=> <View className=' my-4'>
      <View className='  justify-between items-center flex-row'>
    <View className='  '> 
<Text className='text-gray-100 font-pmedium '>search result for</Text>
<Text className='text-gray-100  font-psemiBold   tracking-wider'>{`"${safeQuery}"`} </Text>
    </View>
      <Image source={images.logoSmall} className='w-10 h-10' resizeMode='contain'/>
     
     </View>
     <SearchBar placeholder={safeQuery}/>


      </View>
    }
    ListEmptyComponent={()=><EmptyState title='no videos found' subTitle='be the first one to upload a video'/>}
   
    />





    </SafeAreaView>
  )
}

export default  Search

const styles = StyleSheet.create({})