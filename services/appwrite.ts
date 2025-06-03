import { Client, Account, ID, Avatars, Databases, Query, Storage, ImageGravity } from 'react-native-appwrite';
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
export const storage = new Storage(client)

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

    const user = await account.get();
console.log(user)
  

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
               console.log(error)
            throw error
        }
    }
// export const getFilePreview = async function(fileId:string,type:any){
// let fileUrl;
// try {
//     if(type ==="image"){
//      fileUrl= await storage.getFilePreview(appwriteConfig.storageId,fileId)
//     }else if(type=== "video"){
// fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000,2000, ImageGravity.Top,100)
//     }else{
//         throw new Error("invalid file type")
//     }
//     if (!fileUrl) throw new Error("Could not generate file preview");
//     return fileUrl
// } catch (error) {
//     throw error
// }

// }

export const getFilePreview = async function(fileId: string, type: any) {
  let fileUrl;
  try {
    if (type === "image") {
      fileUrl =  storage.getFilePreview(appwriteConfig.storageId, fileId);  //  here
    } else if (type === "video") {
      fileUrl =  storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );  // await here
    } else {
      throw new Error("invalid file type");
    }
    if (!fileUrl) throw new Error("Could not generate file preview");
    return fileUrl;
  } catch (error) {
       console.log(error)
    throw error;
  }
};



    export const uploadFile = async function(file:any,type:string) {
        if(!file) return
        const {mimeType,...rest}=file
      const asset = {mimeType,...rest}

      try {
        
        const uploadedFile =await storage.createFile(appwriteConfig.storageId,ID.unique(),asset)
        const fileUrl = await getFilePreview( uploadedFile.$id,type)
        return fileUrl
      } catch (error) {
          console.log(error)
        throw error
      }
    }


   export const createVideo = async function(formData:any){
try {
    // returns the thumbnail and videourl to us
    const [thumbnailUrl,videoUrl]=await Promise.all([
        uploadFile(formData.thumbnail,"image"),
        uploadFile(formData.video,"video")
    ])

    const newPost = await databases.createDocument(appwriteConfig.dataBaseId,appwriteConfig.videoCollectionId,ID.unique(),{title:formData.title,thumbnail:thumbnailUrl,creator:formData.userId,video:videoUrl})
    return newPost
} catch (error) {
       console.log(error)
    throw  error
}
   }

