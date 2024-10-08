import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { publicInstance } from "../api/api";
import { privateInstance } from "../api/api";

const Product = () => {
  const location = useLocation();
  const [data, setdata] = useState();
  const [images, setimages] = useState([]);
  const [size, setsize] = useState([]);
  const [image, setimage] = useState();
  const [usersize,setusersize] = useState();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  useEffect(() => {
    publicInstance
      .get(`product?id=${location.state.id}`)
      .then((response) => {
        setdata(response.data[0]);
        setimages(response.data[0].image_name.split(","));
        setsize(response.data[0].available_size.split(","));
        setimage(response.data[0].image_name.split(",")[0]);
      });
  }, []);
  
  const addtocart = () =>{
    if (!usersize){
      alert('select a size')
    }else {
      const payload = {
        size:usersize,
        productid:location.state.id,
      }
      privateInstance.put("cart",payload).then((response)=>{
        alert(response.data.message);
      })
    }
  }
  return (
    <div>
      <div className="py-10 flex gap-10">
        <div className="image-product h-screen  w-1/2 p-10 ">
          <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {image &&
              images.map((value) => (
                <SwiperSlide key={value}>
                  <img
                    className="w-full h-full object-contain"
                    src={`/images/${value}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {image &&
              images.map((value) => (
                <SwiperSlide key={value}>
                  <img
                    className="w-full h-full object-contain rounded-md border-2 p-3 border-green-400"
                    src={`/images/${value}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="p-10 w-1/2">
          <div>
            <h1 className="text-4xl font-serif font-extrabold pb-5">
              {data && data.brand}
            </h1>
            <h2 className="text-4xl font-serif font-bold pb-5">
              {data && data.name}
            </h2>
            <span className="text-xl font-bold pr-5 pb-5 inline-block">
              Rs.{data && data.offer_price}
            </span>
            <span className="text-xl font-bold pr-5 text-gray-500">
              <s>Rs.{data && data.orginal_price}</s>
            </span>
            <span className="text-xl text-green-400">
              {data &&
                Math.round(
                  ((data.orginal_price - data.offer_price) /
                    data.orginal_price) *
                    100
                )}
              %OFF
            </span>
          </div>
          <div>
            <i className="fa-solid fa-star text-yellow-400 pr-1"></i>
            <span className="font-bold">
              {data && data.rating}({data && data.number_of_rating})
            </span>
          </div>
          <p className="pt-5">Select Size(UK):</p>
          <div className="pt-5 flex gap-3">
            {size &&
              size.map((value,index) => (
                <div key={index}>
                  <input
                    className="hidden size"
                    id={index}
                    type="radio"
                    name="size"
                    value={value}
                    onChange={(e)=>{setusersize(e.target.value)}}
                  />
                  <label htmlFor={index} className="sizebutton">
                    <span>{value}</span>
                  </label>
                </div>
              ))}
          </div>
          <p className="py-5">Discription:{data && data.description}</p>
          <p className="text-sm"></p>
          <div className="pt-5 flex gap-10 w-full justify-center items-center">
            <button onClick={addtocart} className="w-40 py-3 bg-green-300 text-white rounded-md">
              <i className="fa-solid fa-cart-shopping pr-2"></i>
              ADD TO CART
            </button>
            <button className="w-40 py-3 bg-green-300 text-white rounded-md">
              <i className="fa-solid fa-cart-shopping pr-2"></i>
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
