'use client'

import { loginHandler } from '@/actions';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { authToken } = useAuth();

    console.log(authToken);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Handle client-side form submission
    const onSubmit = async (data) => {
        try {
            const response = await loginHandler(data, authToken);
            if (response?.success) {
                // Handle success (e.g., navigate to another page or update UI)
                router.push('/dashboard');
            } else {
                // Set error message if there's an issue
                setErrorMessage('Login failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred while logging in.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3">
                    <InputField
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                        register={register}
                        errors={errors}
                    />
                    <InputField
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        type="password" // Ensure it's password type
                        register={register}
                        errors={errors}
                    />
                </div>
                <Button
                    variant="default"
                    type="submit"
                    className="mt-5"
                >
                    Submit
                </Button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
