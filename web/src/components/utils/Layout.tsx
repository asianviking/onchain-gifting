import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";
import { WalletComponents } from "./WalletComponents";
import { Toaster } from "../ui/toaster";
import Navbar from "../Navbar";

const Frame = dynamic(() => import("~/components/utils/Frame"), {
  ssr: false,
});

const ConfettiAnimation = dynamic(
  () => import("~/components/ConfettiAnimation"),
  {
    ssr: false,
  },
);

export function Layout({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-white to-blue-500 p-4 sm:px-20 sm:pb-20 sm:pt-10">
      <div
        style={{
          backgroundImage: "url(/images/bokeh-effect.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="absolute left-0 top-0 z-10 h-full w-full"
      />
      <div className="absolute left-0 top-10 z-20 h-[90%] w-full">
        <ConfettiAnimation />
      </div>
      <Navbar />
      <div className="z-20">
        {children}
        <Toaster />
        <Frame />
      </div>
    </main>
  );
}
