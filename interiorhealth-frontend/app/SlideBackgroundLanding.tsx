"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-green-100 via-white to-green-200">
      {/* Responsive Swiper Slider */}
      <div className="w-full max-w-2xl mx-auto mt-8 z-0">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          className="rounded-2xl shadow-lg"
        >
          {["/landing1.jpg", "/landing2.jpg", "/landing3.jpg", "/landing4.jpg"].map((src, idx) => (
            <SwiperSlide key={src}>
              <div className="flex justify-center items-center w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                <Image
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover rounded-2xl border-4 border-green-600 shadow-lg"
                  priority={idx === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl px-6 py-12 bg-white/80 rounded-xl shadow-xl backdrop-blur-md mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-700 drop-shadow-lg">Welcome to Interior Health</h1>
        <p className="text-base md:text-lg text-gray-700 mb-8">
          Bridging the gap in healthcare access for interior communities.<br />
          Affordable, accessible, and essential medical support at your fingertips.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-6 space-y-4 md:space-y-0 mb-8">
          <Link
            href="/auth/login"
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition w-full md:w-auto"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="border border-green-600 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition w-full md:w-auto"
          >
            Register
          </Link>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Interior Health. All rights reserved.
        </div>
      </div>
    </main>
  );
}
