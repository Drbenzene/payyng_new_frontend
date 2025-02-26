"use client";

import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { motion } from "framer-motion";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  const sliderImages = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"];

  //DISABLE RIGHT CLICK ON THE APP
  useEffect(() => {
    const disableRightClick = (event: any) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F7F7F7]">
      {/* Carousel Section (Fixed) */}
      <div className="relative hidden w-0 flex-1 lg:block object-cover h-screen bg-black">
        <Carousel
          showDots={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          infinite={true}
          responsive={responsive}
          transitionDuration={500}
          arrows={false}
        >
          {sliderImages.map((item, index) => (
            <div key={index} className="w-full h-full rounded-lg">
              <Image
                src={item}
                alt="hero"
                width={1000}
                height={1000}
                className="w-full h-screen object-cover rounded-lg"
              />
            </div>
          ))}
        </Carousel>
      </div>
      {/* Scrollable Children Section */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 overflow-y-auto h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm lg:w-96"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default AuthLayout;
