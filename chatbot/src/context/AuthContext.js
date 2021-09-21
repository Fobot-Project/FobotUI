import React, { useContext, useState, useEffect } from "react"
import { auth, db, storage } from "../firebase"

const AuthContext = React.createContext()

const defaultImage =
  "gs://test-bot-hldq.appspot.com/static material/default user/Twemoji_1f61d.svg.png";

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

const register = async (name, email, password) => {
    try {
      const res = await auth
        .createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      const user = res.user;
      const data = {
        name: name,
        email: email,
        authProvider: "local",
        icon_image: defaultImage,
      };
  
      await db.collection("User").doc(user.uid).set(data);
      await db
        .collection("User")
        .doc(user.uid)
        .collection("restaurants")
        .doc("Empty")
        .set({
          status: "empty",
        });
      return auth.currentUser.updateProfile({
        displayName: name,
      });
      
    } catch (err) {
      console.error(err);
      alert(err.message);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
      throw new Error();
    }
  };

  const logout = () => {
    auth.signOut();
  };

  const resetEmail = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    register,
    logout,
    resetEmail,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}