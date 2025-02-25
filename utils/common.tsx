"use client";

import ReactQueryClientProvider from "./reactQueryClientProvider";
import { Toaster } from "sonner";
// import ScrollToTop from "@/app/components/layouts/scrollToTop";

interface ICommonProps {
  children: React.ReactNode;
}
export default function Common({ children }: ICommonProps) {
  return (
    <ReactQueryClientProvider>
      <Toaster position="top-right" richColors={true} />
      {/* <ScrollToTop /> */}
      {children}
    </ReactQueryClientProvider>
  );
}
