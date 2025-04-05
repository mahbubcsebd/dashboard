"use client"

import userImage from '@/assets/images/avatar.png';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';

const HeaderUser = () => {
    const { user } = useAuth();
  return (
      <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-[40px] h-[40px] overflow-hidden rounded-full border-2 border-gray-200">
              <Image
                  src={userImage}
                  alt="user"
                  className="object-cover w-full h-full rounded-full"
              />
          </div>
          <p className="text-base text-gray-300">{`${
              user ? `${user?.firstName} ${user?.lastName}` : 'Anonymous'
          }`}</p>
      </div>
  );
}

export default HeaderUser