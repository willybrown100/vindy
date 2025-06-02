import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchPost } from '@/services/appwrite'

const useSearch = (query:string ) => {
const {data,isPending,isRefetching,refetch}=useQuery({
    queryFn:()=>searchPost(query),
    queryKey:["search"]
})
return {data,isPending,isRefetching,refetch}
}

export default useSearch

const styles = StyleSheet.create({})