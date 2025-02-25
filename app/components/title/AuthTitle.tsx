import React from "react";
import Image from "next/image";
interface AuthTitleProps {
  title: string;
  subtitle: string;
}

function AuthTitle({ title, subtitle }: AuthTitleProps) {
  return (
    <div className="mb-5">
      <div>
        <Image
          height={200}
          width={200}
          alt="Payyng"
          src="/logo.png"
          className="h-10 w-auto object-contain"
        />
        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default AuthTitle;
