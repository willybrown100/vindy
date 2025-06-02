import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllPost } from '@/services/appwrite'

const useGetAllPost = () => {
const {data,isPending,error,isRefetching,refetch}=useQuery({
    queryFn:getAllPost,
    queryKey:["post"],
})



 return {data,isPending,error,getAllPost,isRefetching,refetch}
}

export default useGetAllPost

