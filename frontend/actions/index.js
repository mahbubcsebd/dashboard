'use server'

import { login } from '@/utils/fetchAuth';
import { cookies } from 'next/headers';

export async function loginHandler(data, token) {
    // The 'data' comes as an object, not as FormData directly
    const { email, password } = data;

    try {
        const response = await login( JSON.stringify({ email, password }), token);

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
                const { accessToken } = responseData.payload;
                cookies().set('accessToken', accessToken, { secure: true });
                return { success: true }; // Return success
            } else {
                return { success: false };
            }
        } else {
            throw new Error('Failed to log in');
        }
    } catch (error) {
        console.error('Failed to log in.', error);
        return { success: false }; // Return failure
    }
}

export const authHandler = async () => {
    try {
         const cookieStore = cookies();
         const token = cookieStore.get('accessToken');
         // Get token from cookies
        return token;
    } catch (error) {
        console.error('Failed to authenticate.', error);
        return null;
    }
};
