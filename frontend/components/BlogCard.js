import BlogImage from "@/assets/images/blog.jpg";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from 'react-icons/fa';
import { IoIosClock } from 'react-icons/io';

const BlogCard = ({blog}) => {
    const { _id, title, summary, slug, author, readingTime } = blog;
  return (
      <div className="single-blog">
          <Link
              href={`/blogs/${slug}`}
              className="block w-full h-[300px] overflow-hidden rounded-tl-[10px] rounded-tr-[10px] relative group/link"
          >
              <Image
                  src={BlogImage}
                  alt=""
                  className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
              />
          </Link>
          <div className="p-4 bg-white rounded-bl-[10px] rounded-br-[10px]">
              <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-1 text-gray-700">
                      <p>
                          <FaUserCircle />
                      </p>
                      <p>{author}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-700">
                      <p>
                          <IoIosClock />
                      </p>
                      <p>{readingTime}</p>
                  </div>
              </div>
              <Link
                  href={`/blogs/${slug}`}
                  className="text-base font-semibold mb-3 block text-ellipsis min-h-[48px]"
              >
                  {title}
              </Link>
              <p>{summary.substring(0, 100)}...</p>
          </div>
      </div>
  );
}

export default BlogCard