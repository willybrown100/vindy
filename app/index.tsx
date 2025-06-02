import CustomButton from "@/components/CustomButton";
import images from "@/constants/images";
import { useGlobalContext } from "@/GlobalContextProvider";
import { Redirect,router } from "expo-router";


import { StatusBar } from "expo-status-bar";

import { ActivityIndicator, Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const {height}=Dimensions.get("window")
const {login,loading,user}=useGlobalContext()
console.log(user)
// console.log(login)
if(loading) return <View className="justify-center items-center">
<ActivityIndicator color="black" size="large" />
</View> 
if(!loading && login) return <Redirect href="/home"/>
  return (
    <SafeAreaView
      className=" bg-primary flex-1 justify-center items-center"
    >
      <View className="flex-1 items-center justify-center " style={{height:height * 0.8}}>

   
      <ScrollView contentContainerStyle={{justifyContent:"center",alignItems:"center",flexGrow:1}}>
<View className="w-full items-center px-4 justify-center" >
  <Image source={images.logo} className="w-[130px] h-[48px]" resizeMode="contain"/>
<Image source={images.cards} className="max-w-[380px] w-full h-[348px]" resizeMode="contain"/>
<View className="mt-5 relative">
  <Text className="text-white text-3xl text-center font-bold">Discover endless possibilities with {" "} <Text className="text-secondary-default">Vindy</Text></Text>
  <Image  source={images.path} className="w-[90px] h-5 absolute bottom-[-8px] right-3" resizeMode="contain"/>
</View>
  <Text className="text-gray-100 font-pregular mt-7 text-center">where creativity meets innovation:embark on a journey of limitless exploration with vindy</Text>
  <CustomButton handlePress={()=>router.push("/(auth)/sign-in")} title="continue with email" containerStyle="mt-7 w-full py-4"/>


</View>

      </ScrollView>
         </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
