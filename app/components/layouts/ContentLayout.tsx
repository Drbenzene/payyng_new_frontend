import React from "react";
interface ContentLayoutProps {
  children: React.ReactNode;
}
function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="bg-white p-2 rounded-md w-full md:p-5 ">{children}</div>
  );
}

export default ContentLayout;
