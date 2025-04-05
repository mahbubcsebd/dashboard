import Link from 'next/link';

const Header = () => {
    return (
        <header className="pb-[56px]">
            <div className="fixed top-0 z-50 w-full p-4 text-white bg-gray-800">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/">Logo</Link>
                        </div>
                        <div>
                            <ul className="flex items-center gap-4">
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/blogs">Blog</Link>
                                </li>
                                <li>
                                    <Link href="/contact">Contact</Link>
                                </li>
                                <li>
                                    <Link href="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href="/login">Login</Link>
                                </li>
                                <li>
                                    <Link href="/register">Register</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
