import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '@/services/appwrite'

const useGetCurrentUser = () => {
const {data,isPending}=useQuery({
    queryFn:getCurrentUser,
    queryKey:["user"]
})
return {data,isPending}
}

export default useGetCurrentUser

const styles = StyleSheet.create({})