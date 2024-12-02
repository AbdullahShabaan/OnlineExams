import React from "react";
import MyIcon from "../../../public/AuthPhoto.svg";
import Link from "next/link";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="grid grid-cols-2">
      <div className="container bg-[rgba(240,244,252,1)] pt-14 rounded-tr-[12%] rounded-br-[12%] defaultShadow">
        <div className="max-w-[480px]">
          <h1 className="text-[50px] font-extrabold">
            Welcome to <div className="text-primary">Elevate</div>
          </h1>
          <p className="text-[18px] mb-8">
            Quidem autem voluptatibus qui quaerat aspernatur architecto natus
          </p>
          <MyIcon />
        </div>
      </div>
      <div className="container pt-14 text-[16px]">
        <nav className="flex gap-10 items-center justify-end">
          <ul className="flex gap-5">
            <li>English</li>
            <li className="text-primary50 font-bold">
              <Link href="/auth/login">Sign in</Link>
            </li>
          </ul>

          <Link
            href="/auth/register"
            className="text-primary50 outline outline-1 outline-slate-200 px-4 py-1 rounded-xl "
          >
            Register
          </Link>
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}
