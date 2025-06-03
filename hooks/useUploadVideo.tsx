import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createVideo } from '@/services/appwrite'
import { router } from 'expo-router'

const useUploadVideo = () => {
    const queryClient = useQueryClient()
const {mutate,isPending}=useMutation({
    mutationFn:createVideo,
    onSuccess:()=>{
        Alert.alert("video uploaded successfully")
        router.push("/home")
queryClient.invalidateQueries({queryKey:["post"]})
    },
    onError:(error)=>{
        Alert.alert(error.message)
    }
})
return {mutate,isPending}
}

export default useUploadVideo

const styles = StyleSheet.create({})