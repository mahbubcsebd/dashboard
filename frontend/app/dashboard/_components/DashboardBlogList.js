import { getBlogs } from '@/utils/fetchBlog';
import DashboardBlogCard from './DashboardBlogCard';

const DashboardBlogList = async () => {
    const blogs = await getBlogs();
  return (
      <ul className="grid grid-cols-2 gap-4">
          {blogs.map((blog) => (
              <DashboardBlogCard
                  key={blog._id}
                  blog={blog}
              />
          ))}
      </ul>
  );
}

export default DashboardBlogList