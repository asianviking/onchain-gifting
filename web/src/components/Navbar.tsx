import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import WalletComponents from './utils/WalletComponents';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathName = usePathname();
  return (
    <div className="z-30 flex h-20 w-full items-center justify-between">
    <Link href="/">
      <Image
        src="/images/base-xmas.png"
        alt="Logo"
        width={36}
        height={36}
        priority
      />
      </Link>
      {!pathName?.startsWith("/claim/") && (
        <WalletComponents hideText/>
      )}
    </div>
  );
};

export default Navbar
