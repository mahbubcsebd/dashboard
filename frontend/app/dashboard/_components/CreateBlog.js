'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createBlog, updateBlog } from '@/utils/fetchBlog';
import { Editor } from '@tinymce/tinymce-react'; // Import TinyMCE Editor
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa6';
import { toast } from 'sonner';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const CreateBlog = ({ mode, blog }) => {
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset, // Destructure reset from useForm
        formState: { errors },
        setValue, // For setting field values
    } = useForm({
        defaultValues: {
            author: blog?.author || '',
            title: blog?.title || '',
            summary: blog?.summary || '',
            readingTime: blog?.readingTime || '',
            categories: blog?.categories || '',
            tags: blog?.tags || '',
        },
    });

    const editorRef = useRef(null);

    // Set the content of TinyMCE when blog data is available in edit mode
    useEffect(() => {
        if (mode === 'edit' && blog && editorRef.current) {
            // Ensure editor is initialized before setting content
            if (editorRef.current) {
                console.log(blog.body);
                editorRef.current.setContent(blog.body || '');
            }
        }
    }, [mode, blog]);

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const description = editorRef.current.getContent(); // Get HTML content from TinyMCE
            const blogData = { ...data, body: description }; // Add description (body) to the form data

            const response =
                mode === 'edit'
                    ? await updateBlog(blog._id, JSON.stringify(blogData))
                    : await createBlog(JSON.stringify(blogData));

            if (response.ok) {
                reset();
                editorRef.current.setContent(''); // Clear the editor after submission
                setIsOpen(false);
                toast.success('Blog has been created.', {
                    className: 'bg-green-700 text-white',
                });
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Failed to create blog:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            {mode === 'edit' ? (
                <DialogTrigger asChild>
                    <Button
                        className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-gray-200 transition-all duration-150 border border-gray-200 rounded hover:bg-gray-200 hover:text-gray-900"
                    >
                        Edit
                    </Button>
                </DialogTrigger>
            ) : (
                <DialogTrigger asChild>
                    <button className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-gray-200 transition-all duration-150 border border-gray-200 rounded hover:bg-gray-200 hover:text-gray-900">
                        <span>
                            <FaPlus />
                        </span>{' '}
                        Create Blog
                    </button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[700px] sm:max-h-[500px] overflow-y-auto bg-[#fff] rounded-[10px] hide-scrollbar">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'edit' ? 'Edit Blog' : 'Create Blog'}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {mode === 'edit'
                            ? 'Edit Blog Description'
                            : 'Create Blog Description'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="author">Author Name</Label>
                            <Input
                                id="author"
                                type="text"
                                placeholder="Enter author name"
                                {...register('author', { required: true })}
                            />
                            {errors.author && (
                                <p className="text-red-500">
                                    Author name is required
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter blog title"
                                {...register('title', { required: true })}
                            />
                            {errors.title && (
                                <p className="text-red-500">
                                    Title is required
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="summary">
                                Summary{' '}
                                <span className="text-xs">
                                    max 100 characters
                                </span>
                            </Label>
                            <Input
                                id="summary"
                                type="text"
                                placeholder="Enter blog summary"
                                {...register('summary', { required: true })}
                            />
                            {errors.summary && (
                                <p className="text-red-500">
                                    Summary is required
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="body">Description</Label>
                            <Editor
                                id="body"
                                apiKey="qbvg8lxbbb3thanzrbilyqj8ctxmoyomzuqznsqecr14zsmn"
                                onInit={(evt, editor) =>
                                    (editorRef.current = editor)
                                }
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount',
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help',
                                }}
                            />
                            {errors.body && (
                                <p className="text-red-500">
                                    Description is required
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="readingTime">Reading Time</Label>
                            <Input
                                id="readingTime"
                                type="text"
                                placeholder="Enter reading time"
                                {...register('readingTime', { required: true })}
                            />
                            {errors.readingTime && (
                                <p className="text-red-500">
                                    Reading time is required
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="categories">Categories</Label>
                            <select
                                id="categories"
                                {...register('categories')}
                            >
                                <option value="web">Web</option>
                                <option value="dev">Dev</option>
                                <option value="design">Design</option>
                            </select>
                            {errors.categories && (
                                <p className="text-red-500">
                                    Category is required
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                                id="tags"
                                type="text"
                                placeholder="Enter tags (comma-separated)"
                                {...register('tags', { required: true })}
                            />
                            {errors.tags && (
                                <p className="text-red-500">
                                    Tags are required
                                </p>
                            )}
                        </div>

                        <Button
                            variant="default"
                            type="submit"
                            className="text-white bg-black hover:bg-black capitalize"
                        >
                            {mode ? 'Save' : 'create blog '}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBlog;
