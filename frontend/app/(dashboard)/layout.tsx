import Menu from "../components/Menu";
import Navbar from "../components/Navbat";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <div
          
          className="flex items-center justify-center mt-5 "
        >
          <Image src="/logo.png" alt="logo" width={120} height={120} />
          {/* <span className="hidden lg:block font-bold">CLINIC TIGER</span> */}
        </div>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar/>
        {children}
      </div>
    </div>
  );
}

//bg-[#F7F8FA]