import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllLatestPost } from '@/services/appwrite'

const useGetLatestPosts = () => {
const {data,isPending}=useQuery({
    queryFn:getAllLatestPost,
    queryKey:["latestPost"]
})
return {data,isPending}
}

export default useGetLatestPosts

