import { getBlogs } from '@/utils/fetchBlog';
import BlogCard from './BlogCard';

const BlogsList = async () => {
    const blogs = await getBlogs();
    return (
        <div className="post-list pt-10">
            <div className="container">
                <h2 className="text-5xl text-gray-200 font-bold mb-10">Blog List</h2>
                <ul className="grid grid-cols-4 gap-4">
                    {blogs.map((blog) => (
                        <li key={blog._id}>
                            <BlogCard blog={blog} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BlogsList;
