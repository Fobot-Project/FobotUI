import { useEffect, useState } from 'react';
import { auth } from './firebase';


export default function useProtectedRoute() {

  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {

    const unlisten = auth.onAuthStateChanged(authUser =>{
      authUser? setAuthUser(authUser) : setAuthUser(null)
    });
    return () => {unlisten()}
  }, []);
  return authUser
}