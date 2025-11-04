import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import Loading from '../pages/Loading';
const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
    const creatUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const logInUser = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }
    const updateUser = (currentUser,userObj)=>{
        setLoading(true)
        return updateProfile(currentUser,userObj);
    }
    // googleLogin
    const googleProvider = new GoogleAuthProvider();
    const googleLogin=()=>{
        return signInWithPopup(auth,googleProvider)
    }
    const logoutUser = ()=>{
        return signOut(auth);
    }
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
        setLoading(false);
      })
      return unsubscribe
    }, [])
    console.log(user)
    const value = {
        creatUser,
        logoutUser,
        logInUser,
        user,
        loading,
        updateUser,
        setLoading,
        googleLogin
    }
    return <AuthContext value={value}>
        {loading?<Loading/>:children}
    </AuthContext>
};

export default AuthProvider;