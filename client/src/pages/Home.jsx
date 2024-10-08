import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductBox from "../components/ProductBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { publicInstance } from "../api/api";

const Home = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    publicInstance.get("home").then((response) => {
      setdata(response.data);
    });
  }, []);
  return (
    <div className="w-full">
      <section className="pt-14 h-screen">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="homeswiper h-full"
      >
        <SwiperSlide>
          <img className="" src='/image/trail1.jpg' alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="" src='/image/789354.jpg' alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="" src='/image/wp2702669.jpg' alt="" />
        </SwiperSlide>
      </Swiper>
      </section>
      <section className="p-10 flex flex-col gap-10">
        <div className="">
          <p className="text-3xl font-serif pb-10">Casual</p>
          <Swiper
            slidesPerView={6}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="productSwiper"
          >
            {data &&
              data
                .filter((value) => value.subcategory == "casual")
                .map((filteredvalue) => (
                  <SwiperSlide key={filteredvalue.product_id}>
                    <ProductBox
                      value={filteredvalue}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
        <div className="">
          <p className="text-3xl font-serif pb-10">Formal</p>
          <Swiper
            slidesPerView={6}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="productSwiper"
          >
            {data &&
              data
                .filter((value) => value.subcategory == "formal")
                .map((filteredvalue) => (
                  <SwiperSlide key={filteredvalue.product_id}>
                    <ProductBox
                      value={filteredvalue}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
        <div className="">
          <p className="text-3xl font-serif pb-10">Sports</p>
          <Swiper
            slidesPerView={6}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="productSwiper"
          >
            {data &&
              data
                .filter((value) => value.subcategory == "sports")
                .map((filteredvalue) => (
                  <SwiperSlide key={filteredvalue.product_id}>
                    <ProductBox
                      value={filteredvalue}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Home;
