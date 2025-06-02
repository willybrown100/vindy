import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity,ViewToken } from 'react-native'
import React, { useState } from 'react'
import { Models } from 'react-native-appwrite';
import * as Animatable from "react-native-animatable"
import icons from '@/constants/icons';
import { Video,ResizeMode } from 'expo-av';



const zoomIn = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};


type Post = Models.Document;
interface postType {
  post: Models.Document[] | [];
}

interface RenderItemProps {
  activeItem: Post;
  item: Post;
}






const RenderItem = ({ activeItem, item }:RenderItemProps) => {
  const [play, setPlay] = useState(false);
console.log(item.video, play)
  return (
    <Animatable.View
      animation={activeItem?.$id === item?.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={styles.video}
          useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          // resizeMode="cover"
          shouldPlay
          isLooping
          
        />
      ) : (
 <TouchableOpacity
  onPress={() => setPlay(true)}
  style={{
    width: 208, // same as w-52
    height: 208, // 13rem ~ 208px
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  }}
  activeOpacity={0.8}
>
  <ImageBackground
  
    source={{ uri: item.thumbnail }}
    style={{ width: '100%', height: '100%' }}
    imageStyle={{ borderRadius: 16 }}
  >
 
    <Image
      source={icons.play}
      style={{
        position: 'absolute',
        width: 28,
        
        height: 28,
        top: '50%',
        left: '50%',
        transform: [{ translateX: -14 }, { translateY: -14 }],
        zIndex: 10,
      }}
      resizeMode="contain"
    />
  </ImageBackground>
</TouchableOpacity>


      )}
    </Animatable.View>
  );
};


// const RenderItem = function({activeItem,item}:RenderItemProps){
//   const [play, setPlay]=useState(false)
//   return <Animatable.View
//     animation={activeItem?.$id===item?.$id? zoomIn:zoomOut} 
//   duration={500}
//   >
// {play ? <Text className='text-white  text-center'>playing</Text>:<TouchableOpacity className="overflow-hidden relative p-3" onPress={()=>setPlay(true)}>
//   <ImageBackground source={{uri:item.thumbnail}} className='w-52 h-[13rem] rounded-xl '/>
//   <Image source={icons.play} className='w-7 h-7 absolute'  resizeMode='contain'/>
//   </TouchableOpacity>}
//   </Animatable.View>
// }


const TrendingVideo = ({post}:postType) => {
  const [activeItem,setActiveItem]=useState(post[0])

//   const viewAbleItemChange = function({viewableItems}){
// if(viewableItems.length > 0){
//   setActiveItem(viewableItems[0].key)
// }
 const viewAbleItemChange: ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => void = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.id); // or `.key` depending on what you're using
    }
  };


  return (
    
<FlatList data={post} onViewableItemsChanged={viewAbleItemChange} viewabilityConfig={{itemVisiblePercentThreshold:70}} contentOffset={{x:170,y:0}} horizontal keyExtractor={(item)=>item?.$id?.toString()} className='' renderItem={({item})=><RenderItem activeItem={activeItem} item={item}/>}/>
  )
}

export default TrendingVideo






const styles = StyleSheet.create({
  video: {
    width: 208, // 52 * 4
    height: 288, // 72 * 4
    borderRadius: 12,
    flex:1
  },
  touch: {
    position: 'relative',
    padding: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 208,
    height: 208,
    borderRadius: 12,
  },
 playIcon: {
  position: 'absolute',
  width: 28,
  height: 28,
  top: '50%',
  left: '50%',
  transform: [
    { translateX: "-30%" }, // half of width


  ],
},

});


