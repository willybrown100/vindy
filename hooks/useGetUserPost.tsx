import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserPost } from '@/services/appwrite'



const useGetUserPost = (userId:string) => {

const {data,isPending}=useQuery({
    queryFn: ()=>getUserPost(userId),
    queryKey:["userPost"],
    enabled: !!userId

})
return {data,isPending}
}

export default useGetUserPost

const styles = StyleSheet.create({})