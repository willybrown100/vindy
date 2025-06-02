
import { signIn, signInt } from '@/services/appwrite'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert } from 'react-native'
// import { Models } from 'react-native-appwrite'

const useSignin = () => {
    const router = useRouter()
const {mutate,isPending}=useMutation<void, Error,signInt>({
    mutationFn:signIn,
    onSuccess:()=>{
       router.push("/home")

      },
      onError: (error) => {
   Alert.alert(error.message);
  },
})
return {mutate,isPending}
}

export default useSignin

