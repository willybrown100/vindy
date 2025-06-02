
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { account, appwriteConfig, databases,  } from './services/appwrite'
import { Models, Query } from 'react-native-appwrite'
import AsyncStorage from '@react-native-async-storage/async-storage';


// type GlobalContextType = {
//   user: Models.Document | {};
//   loading: boolean;
//   login:boolean
// };


// const GlobalContext = createContext<GlobalContextType>({ user: {},
//   loading: false,login:false})
  
// export const GlobalContextProvider = ({children}:any) => {
// const [user, setUser] = useState<Models.Document | undefined>(undefined);


// const [loading,setLoading]=useState(false)
// const [login,setLogin]=useState(false)
//     useEffect(()=>{
//      const  getCurrentUser = async function () {
//             try {
//                 setLoading(true)
//                 const currentAccount = await account.get()
//                 if(!currentAccount) throw Error;
//                     // get user from  database which his id match that current id
//                     const authenticatedUser = await databases.listDocuments(appwriteConfig.dataBaseId,appwriteConfig.usersCollectionId,[Query.equal("accountId",currentAccount.$id)])
//     if(!authenticatedUser) throw new Error;

//        if (authenticatedUser.documents.length > 0) {
//   setLogin(true);
//   setUser(authenticatedUser.documents[0]);
// } else {
//   setLogin(false);
//   setUser(undefined);
// }

   

//             } catch (error) {
//                 console.log(error)
//                 throw error
//             }finally{
//                   setLoading(false)
//             }
//         }
//         getCurrentUser()

//     },[])

// return <GlobalContext.Provider value={{user,loading,login}} >
// {children}
// </GlobalContext.Provider>

// }

// export const useGlobalContext = function(){
// return useContext(GlobalContext)
// }
// export default GlobalContextProvider


interface GlobalContextType {
  user: Models.Document | undefined;
  loading: boolean;
  login: boolean;
  setUser: Dispatch<SetStateAction<Models.Document | undefined>>;
}

export const GlobalContext = createContext<GlobalContextType>({
  user: undefined,
    setUser: () => {}, 
  loading: false,
  login: false,
});

interface Props {
  children: ReactNode;
}

export const GlobalContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<Models.Document | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setLoading(true);

        // Get account
        const currentAccount = await account.get();
        if (!currentAccount) throw new Error('No current account found');

        // Get user document using account ID
        const response = await databases.listDocuments(
          appwriteConfig.dataBaseId,
          appwriteConfig.usersCollectionId,
          [Query.equal('accountId', currentAccount.$id)]
        );

        const authenticatedUser = response.documents[0];

        if (authenticatedUser) {
          setLogin(true);
          setUser(authenticatedUser);
        } else {
          setLogin(false);
          setUser(undefined);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        setLogin(false);
      
        // setUser();
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  return (
    <GlobalContext.Provider value={{ user,loading, setUser, login }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = function(){
return useContext(GlobalContext)
}
export default GlobalContextProvider







https://samplelib.com/lib/preview/mp4/sample-5s.jpg


<video src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"></video>