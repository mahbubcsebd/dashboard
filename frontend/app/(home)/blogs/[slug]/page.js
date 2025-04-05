import { getBlogBySlug } from "@/utils/fetchBlog";
import BlogContent from "../../_components/BlogContent";

const BlogDetailsPage = async ({params: {slug}}) => {
    const blog = await getBlogBySlug(slug);
  return (
      <div className="">
          <BlogContent blog={blog} />
      </div>
  );
}

export default BlogDetailsPage