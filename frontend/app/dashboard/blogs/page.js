import CreateBlog from '../_components/CreateBlog'
import DashboardBlogList from '../_components/DashboardBlogList'

const DashboadBlogPage = () => {
  return (
    <div>
        <div className="pt-10 dashboard-blog-area">
            <div className="container">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-semibold text-gray-200 dashboard-title">Blogs</h2>
                <CreateBlog />
            </div>
                <div className="dashbord-blog-content">
                  <DashboardBlogList />
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboadBlogPage