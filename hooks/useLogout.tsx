import { useMutation, } from '@tanstack/react-query'
import { Logout } from '@/services/appwrite'
import { router } from 'expo-router'
import { Alert } from 'react-native'

const useLogout = () => {
const {mutate,isPending}= useMutation({
    mutationFn:Logout,
        onSuccess:()=>{


 router.replace("/(auth)/sign-in")

      },
      onError:(error)=>{
        Alert.alert(error.message)
      }
})
return {mutate,isPending}
}

export default useLogout
