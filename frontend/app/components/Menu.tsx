import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/",
        label: "แดชบอร์ด",
        href: "/dashboard",
      },
      {
        icon: "/",
        label: "ระบบจัดการคลีนิค",
        href: "/manage",
      },
      {
        icon: "/",
        label: "บันทึกค่าใช้จ่าย",
        href: "/expense",
      },
      {
        icon: "/",
        label: "ใบเสร็จ",
        href: "/billing",
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/",
        label: "โปรไฟล์",
        href: "/profile",
      },
      {
        icon: "/",
        label: "ตั้งค่า",
        href: "/settings",
      },
      {
        icon: "/",
        label: "ออกจากระบบ",
        href: "/logout",
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );

          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
