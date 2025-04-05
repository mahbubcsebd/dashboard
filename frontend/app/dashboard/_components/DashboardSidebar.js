import Link from "next/link";

const DashboardSidebar = () => {
  return (
      <div className="dashboard-sidebar">
          <div className="dashboard-sidebar-area fixed left-0 w-[300px] bg-gray-800 text-white h-screen">
              <div className="px-5 pt-20 sidebar-content">
                  <ul className="flex flex-col gap-4">
                      <li>
                          <Link href="/">Home</Link>
                      </li>
                      <li>
                          <Link href="/dashboard/blogs">Blog</Link>
                      </li>
                      <li>
                          <Link href="/contact">Contact</Link>
                      </li>
                      <li>
                          <Link href="/about">About</Link>
                      </li>
                      <li>
                          <Link href="/dashboard">Dashboard</Link>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  );
}

export default DashboardSidebar