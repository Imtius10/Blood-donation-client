import React, { createContext, useState, useEffect } from 'react';
import auth from '../Firebase/Firebase.config';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged, 
    signInWithEmailAndPassword 
} from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('')
    const [roleloading, setroleLoading] = useState(true);
    // 1. Email/Password Registration
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // 2. Email/Password Login
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // 3. Google Sign-In
    const signInWithGoogle = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // 4. Sign Out
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    // const getRole =async () => {
    //     setLoading(true)
    //     await axios.get(`http://localhost:3000/users/role/${user.email}`)
    //         .then(res => {
    //             console.log(res.data.role);

    //             setRole(res.data.role)
    //             setLoading(false)
    //         })
    //     console.log(user) 
    // }
    useEffect(() => {
        if (!user) return;
        axios.get(`https://blood-donation-server-coral.vercel.app/users/role/${user.email}`)
            .then(res => {
                console.log(res.data.role);

                setRole(res.data.role)
                setLoading(false)
                setroleLoading(false)
            })
        
    },[user])
    console.log(role)  

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Update user state (null on logout, user object on login)
            setLoading(false);
           
            // Stops the initial loading screen after Firebase checks local storage
        });

        // Cleanup function to detach the listener when the component unmounts
        return () => unsubscribe();
    }, []);
    
    const authData = {
        loading,
        setLoading,
        user,
        setUser,
        createUser,
        loginUser,
        signInWithGoogle,
        logoutUser,
        role,
    };

    return (
        <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;