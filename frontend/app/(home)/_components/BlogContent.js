import blogDetailsImage from '@/assets/images/blog-details.jpg';
import Image from "next/image";

const BlogContent = ({blog}) => {
    const {_id,title,author, body, readingTime, tags, categories} = blog;
  return (
      <div className="text-white pt-10">
          <div className="container">
              <div>
                  <h1 className="text-4xl font-bold mb-4">{title}</h1>
                  <div>
                      <p className="text-lg mb-2">Author: {author}</p>
                  </div>
              </div>
              <div className="max-h-[350px] overflow-hidden mb-4">
                  <Image
                      src={blogDetailsImage}
                      alt={title}
                      className="w-full h-full object-cover object-center"
                  />
              </div>
              <div dangerouslySetInnerHTML={{ __html: body }}></div>
          </div>
      </div>
  );
}

export default BlogContent