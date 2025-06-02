import { SplashScreen, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./globals.css"
import {useFonts} from "expo-font"
import { useEffect } from "react";
import GlobalContextProvider from "@/GlobalContextProvider";


SplashScreen.preventAutoHideAsync()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded, error]=useFonts({
    "Poppins-Black":require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold":require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-ExtraBold":require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight":require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light":require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium":require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular":require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold":require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin":require("../assets/fonts/Poppins-Thin.ttf")
  })

  useEffect(()=>{
    if(error) throw error
if(fontsLoaded) SplashScreen.hideAsync()
  // if(!fontsLoaded && !error)return null
  },[fontsLoaded,error])
  
  return <QueryClientProvider client={queryClient}>
    <GlobalContextProvider>

 
  <Stack>
          <Stack.Screen options={{ headerShown: false }} name="index" />
          <Stack.Screen options={{ headerShown: false }} name="(auth)" />
          <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
          <Stack.Screen options={{ headerShown: false }} name="search/[query]" />
          </Stack> 
             </GlobalContextProvider>
          </QueryClientProvider>
}
