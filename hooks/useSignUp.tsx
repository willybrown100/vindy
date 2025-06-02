import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { signInType, signUser } from '@/services/appwrite'
import { Models } from 'react-native-appwrite';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

 const useSignUp = () => {
  const router = useRouter()
    const { mutate, isPending, isError, error } = useMutation<Models.Document, Error, signInType>({
      mutationFn: signUser,
      onSuccess:()=>{
router.push("/home")
      },
         onError: (error) => {
    Alert.alert(error.message);
   },
    });
  
    return {
      mutate,
      isPending,  // isPending is typically called `isLoading` in react-query
      isError,
      error,
    };
  }

export default useSignUp

