import React from "react";
import { useNavigate } from "react-router-dom";

const ProductBox = ({ value }) => {
  const navigate = useNavigate();
  const product = (id) => {
    navigate("/product", { state: { id } });
  };
  return (
    <div
      className="border-2 border-gray-300  w-fit hover:cursor-pointer"
      onClick={() => {
        product(value.product_id);
      }}
    >
      <div className="bg-white py-5 px-2">
        <img
          className="h-48 w-48 object-contain"
          src={`/images/${value && value.image_name.split(",")[0]}`}
          alt=""
        />
      </div>
      <div className="py-3 px-2">
        <p className="font-bold">{value && value.brand}</p>
        <p className="pb-3 text-nowrap">{value && value.name}</p>
        <div className="flex justify-between">
          <span className="font-bold pb-3 text-lg">
            Rs.{value && value.offer_price}
          </span>
          <span className="font-bold text-gray-400 text-lg">
            <s>Rs.{value && value.orginal_price}</s>
          </span>
          <br />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-green-400 ">
            {value &&
              Math.round(
                ((value.orginal_price - value.offer_price) /
                  value.orginal_price) *
                  100
              )}
            %OFF
          </span>
          <div>
            <i className="fa-solid fa-star text-yellow-400"></i>
            <span>
              {value && value.rating}({value && value.number_of_rating})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
