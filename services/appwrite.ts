import AsyncStorage from '@react-native-async-storage/async-storage';
import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';
export const appwriteConfig = {
    endpoint:"https://fra.cloud.appwrite.io/v1",
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
dataBaseId:process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
usersCollectionId:process.env.EXPO_PUBLIC_APPWRITE_USERCOLLECTION_ID!,
videoCollectionId:process.env.EXPO_PUBLIC_APPWRITE_VIDEOCOLLECTION_ID!,
storageId:process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!
}
const client = new Client()
.setEndpoint(appwriteConfig.endpoint)
.setProject(appwriteConfig.projectId)
.setPlatform('com.vindy.vindyApp');

export interface signInType{
    email:string,password:string,userName:string
}

//register user
export const account= new Account(client)
const avatars = new Avatars(client)
export const databases = new Databases(client)

// signup session
export const signUser = async function({email,password,userName}:signInType){
try {
    const newAccount = await account.create(ID.unique(), email, password, userName);
if(!newAccount)throw new Error
const avatarUrl = avatars.getInitials(userName)
await signIn({email,password})
// creating user in our database
const newUser = await databases.createDocument(
  appwriteConfig.dataBaseId,
  appwriteConfig.usersCollectionId,
  ID.unique(), // document ID
  { accountId: newAccount.$id, email, userName, avatar: avatarUrl }
);


return newUser

} catch (error) {
    console.log(error)
    throw  error
}
    }


export interface signInt{
    email:string,password:string
}

// sign in session
    export const signIn = async function ({email,password}:signInt):Promise<void> {
        try {
            const session = await account.createEmailPasswordSession(email,password)
console.log(session)
 // 2. Get the authenticated user info
    const user = await account.get();
console.log(user)
    // 3. Get the user ID (this is the one you stored as `accountId` in your user documents)
    // const userId = user.$id;

    // 4. Save userId to AsyncStorage
    // await AsyncStorage.setItem('userId', userId);

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    export const  getCurrentUser = async function () {
        try {
            //
            const currentAccount = await account.get()
            if(!currentAccount) throw Error()
                // get user from  database
                const authenticatedUser = await databases.listDocuments(appwriteConfig.dataBaseId,appwriteConfig.usersCollectionId,[Query.equal("accountId",currentAccount.$id)])
if(!authenticatedUser) throw new Error()
    return authenticatedUser.documents[0]
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    
    export const getAllPost = async function (){
     try {
      const posts = await databases.listDocuments(appwriteConfig.dataBaseId,appwriteConfig.videoCollectionId) 
      return posts.documents

     } catch (error) {
        console.log(error)
        throw error
     }
    }


    export const getAllLatestPost = async function (){
     try {
      const posts = await databases.listDocuments(
  appwriteConfig.dataBaseId,
  appwriteConfig.videoCollectionId,
  [
    Query.orderDesc("$createdAt"),
    Query.limit(7)
  ]
);

      return posts.documents

     } catch (error) {
        console.log(error)
        throw error
     }
    }


    export const searchPost = async function (query:string){
     try {
      const posts = await databases.listDocuments(
  appwriteConfig.dataBaseId,
  appwriteConfig.videoCollectionId,
  [
    Query.search("title", query),
    
  ]
);

      return posts.documents

     } catch (error) {
        console.log(error)
        throw error
     }
    }
    export const getUserPost = async function (userId:string ){
     try {
      const posts = await databases.listDocuments(
  appwriteConfig.dataBaseId,
  appwriteConfig.videoCollectionId,
  [
    Query.equal("creator", userId),
    
  ]
);
      return posts.documents

     } catch (error) {
        console.log(error)
        throw error
     }
    }

    export const Logout = async  function(){
        try {
            const session  = await account.deleteSession("current")
            return session
        } catch (error) {
            throw error
        }
    }

   