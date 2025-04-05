// DashboardBlogCard.js
'use client';

import blogImage from '@/assets/images/blog.jpg';
import { deleteBlogById } from '@/utils/fetchBlog';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import CreateBlog from './CreateBlog';
import DeleteAction from './DeleteAction';

const DashboardBlogCard = ({ blog }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async (id) => {
        try {
            const response = await deleteBlogById(id.toString());
            setIsOpen(false);
            if (!response.ok) {
                 toast.success('Blog has been deleted.', {
                     className: 'bg-green-700 text-white',
                 });
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const { title, author, slug, _id } = blog;

    return (
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl single-dashboard-blog">
            <div className="flex items-center gap-2">
                <div>
                    <div className="w-[70px] h-[80px] overflow-hidden rounded">
                        <Image
                            src={blogImage}
                            alt={title}
                            className="object-cover w-full h-full"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                <div className="max-w-[250px]">
                    <Link
                        className="mb-3 text-base font-semibold text-gray-200 text-ellipsis line-clamp-2"
                        href={`blogs/${slug}`}
                    >
                        {title}
                    </Link>
                    <p className="text-xs font-semibold text-gray-200">
                        {author}
                    </p>
                </div>
            </div>
            <ul className="flex items-center gap-4 text-gray-200 blog-actions">
                <li>
                    <CreateBlog
                        mode="edit"
                        blog={blog}
                    />
                </li>
                <li>
                    <DeleteAction
                        handleDelete={() => handleDelete(blog._id)}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        id={_id}
                    />
                </li>
            </ul>
        </div>
    );
};

export default DashboardBlogCard;
