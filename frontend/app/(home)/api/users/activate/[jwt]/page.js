// 'use client' directive ensures that this component is rendered on the client side
'use client';

import { Button } from '@/components/ui/button';
import { verifyUser } from '@/utils/fetchUser'; // Function to send the POST request to verify
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const VerifyPage = ({ params: { jwt } }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter()

    const handleVerify = async () => {
        setLoading(true);
        setError(null);
        const jwtToken = {
            token: jwt,
        };

        try {
            const response = await verifyUser(jwt);

            if (response.success) {
                setSuccess(true);
                router.push("/login")
                console.log('User verified successfully');
            } else {
                setError(response.message || 'Verification failed');
            }
        } catch (error) {
            setError(error.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-white">
            <p>VerifyPage ID: {jwt}</p>
            {error && <p className="text-red-500">{error}</p>}{' '}
            {/* Display error */}
            {success && (
                <p className="text-green-500">User verified successfully!</p>
            )}{' '}
            {/* Display success message */}
            <Button
                variant="destructive"
                onClick={handleVerify}
                disabled={loading || success}
            >
                {loading ? 'Verifying...' : 'Verify'}
            </Button>
        </div>
    );
};

export default VerifyPage;
