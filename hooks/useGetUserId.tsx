import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
  
const useGetUserId = () => {
  const [id,setId]=useState<string | null>("")

    useEffect(()=>{

        async function getId (){
    const userId = await AsyncStorage.getItem('userId');
    setId(userId)
        }
        getId()
    },[])
    return {id}
}

export default useGetUserId

const styles = StyleSheet.create({})