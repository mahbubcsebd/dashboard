import Link from 'next/link';
import HeaderUser from './HeaderUser';

const DashboardHeader = () => {
    return (
        <header className="pb-[72px] border-b border-gray-700">
            <div className="fixed top-0 z-50 w-full p-4 text-white bg-gray-800">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/">Logo</Link>
                        </div>
                        <div className="flex items-center gap-20">
                            <HeaderUser />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
