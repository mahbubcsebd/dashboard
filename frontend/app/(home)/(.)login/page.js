"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import LoginForm from '../_components/LoginForm';

const LoginPageInModal = () => {
    const router = useRouter();

    const handleClose = () => {
        // Go back to the previous route when the modal is closed
        router.back();
    };

    return (
        <Dialog
            defaultOpen={true}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    handleClose();
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you are done.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <LoginForm />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginPageInModal;
