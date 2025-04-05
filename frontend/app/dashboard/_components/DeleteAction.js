import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const DeleteAction = ({ isOpen, setIsOpen, handleDelete }) => {

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
            className="bg-[#F6F4FD] border-[rgba(136, 49, 225, 0.20)] rounded-xl"
        >
            <DialogTrigger asChild>
                <button className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-gray-200 transition-all duration-150 border border-gray-200 rounded hover:bg-gray-200 hover:text-gray-900">
                    Delete
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] sm:max-h-[500px] overflow-y-auto bg-[#F6F4FD] border-[rgba(136, 49, 225, 0.20)]">
                <DialogHeader>
                    <DialogTitle>Create Blog</DialogTitle>
                    <DialogDescription className="sr-only">
                        Create Blog Description
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end mt-4">
                    <Button
                        variant="secondary"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAction;
