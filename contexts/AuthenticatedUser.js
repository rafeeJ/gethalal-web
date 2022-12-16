import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "../firebase/clientApp";

const AuthenticatedUser = React.createContext({ user: null, loading: true });

export const AuthenticatedUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // if user is null, then create an anonymous user
            if (!user) {
                const cred = signInAnonymously(auth);
                console.log("Anonymous user created", cred);
            }
            setUser(user);
            setLoading(false);
        });
    
        return () => unsubscribe();
    }, []);
    
    return (
        <AuthenticatedUser.Provider value={{ user, loading }}>
            {children}
        </AuthenticatedUser.Provider>
    );
    };
