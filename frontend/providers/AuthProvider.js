'use client';

import { authHandler } from '@/actions';
import AuthContext from '@/contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const callFunction = async () => {
            const token = await authHandler();

            if (token) {
                setAuthToken(token.toString());
                // You can decode the token here if needed to extract user information
                const tokenString = token.toString();
                const decoded = jwtDecode(token.value);

                // console.log(decoded);
                setUser(decoded.payload.user); // Set the token or user data in state
            } else {
                // Handle the case where authentication fails or the token is not present
                setUser(null);
                setAuthToken(null);
            }
        };

        callFunction();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, setUser, authToken, setAuthToken }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
