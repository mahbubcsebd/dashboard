'use client';

import InputField from '@/components/InputField';
import { Button } from '@/components/ui/button';
import { createUser } from '@/utils/fetchUser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const RegisterPage = () => {
     const [errorMessage, setErrorMessage] = useState('');
     const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await createUser(JSON.stringify(data));

            if (response.ok) {
                const responseData = await response.json();

                if (responseData.success) {
                    reset();
                    router.push('/email-verification');
                    // toast.success(`${responseData.success}`, {
                    //     position: 'bottom-right',
                    // });
                } else {
                    console.log(responseData.message)
                    setErrorMessage(responseData.message);
                    // toast.error(
                    //     `দুঃখিত! আপনার অর্ডারটি সফল হয়নি। ${responseData.message}`,
                    //     {
                    //         position: 'bottom-right',
                    //     }
                    // );
                }
            } else {
                throw new Error('Failed to submit Order');
            }
        } catch (error) {
            console.error('Failed to register user.', error);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="max-w-xl px-8 py-10 mx-auto mt-10 bg-white border border-gray-400 rounded-xl">
                    <h2 className="mb-4 text-3xl font-semibold text-gray-800">
                        Register User
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-3">
                            <InputField
                                label="First Name"
                                name="firstName"
                                placeholder="Enter your first name"
                                register={register}
                                errors={errors}
                            />
                            <InputField
                                label="Last Name"
                                name="lastName"
                                placeholder="Enter your last name"
                                register={register}
                                errors={errors}
                            />
                            <InputField
                                label="Email"
                                name="email"
                                placeholder="Enter email address"
                                register={register}
                                errors={errors}
                            />
                            <InputField
                                label="Password"
                                name="password"
                                placeholder="Enter password"
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
            </div>
        </div>
    );
};

export default RegisterPage;
