import React, { useEffect, useState } from "react";
import { privateInstance } from "../api/api";
import { useStripe } from "@stripe/react-stripe-js";

const Cart = () => {
  const [data, setdata] = useState([]);
  const [total, settotal] = useState();
  const stripe = useStripe();

  const getcart = () =>{
    privateInstance.get("cart").then((response) => {
      setdata(response.data.product);
      settotal(response.data.total[0]);
      console.log(response);
    });
  }
  useEffect(() => {
    getcart();
  }, []);
  const handlepay = () => {
         privateInstance.get('checkout-cart').then((response)=>{stripe.redirectToCheckout({ sessionId: response.data.id })})
};
const removeitem = (id) => {
  privateInstance.post('deletecartitem',{cart_id:id,}).then((response)=>{getcart()})
}
  return (
    <div className="min-h-screen">
      <h1 className="pt-24 pl-10 text-2xl font-bold">Shopping cart</h1>
      <div className={`w-full pt-40 text-center text-xl ${data[0]?'hidden':'block'}`}>NO ITEMS IN CART</div>
      <div className={`p-10 gap-20 justify-center ${data[0]?'flex':'hidden'}`}>
        <div className="border-2 h-fit ">
          {data &&
            data.map((value) => (
              <div key={value.cart_id} className="flex border-b-2 p-5 last:border-0">
                <div className="pr-5">
                  <img
                    className="w-40 h-40 object-contain"
                    src={`/images/${value.image_name.split(",")[0]}`}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-semibold text-lg">{value.name}</p>
                  <p className="text-sm text-gray-500">Size:{value.size}</p>
                  <p className="text-sm text-gray-500">Brand:{value.brand}</p>
                  <p> <i className="fa-solid fa-star text-yellow-400"></i><span>{value.rating}({value.number_of_rating})</span></p>
                  <span className="text-sm text-gray-500 pr-3">
                    <s>Rs.{value.orginal_price}</s>
                  </span>
                  <span className="text-xl pr-3 font-bold">
                    Rs.{value.offer_price}
                  </span>
                  <span className="text-sm font-bold text-green-400">
                    {Math.round(
                      ((value.orginal_price - value.offer_price) /
                        value.orginal_price) *
                        100
                    )}
                    %OFF
                  </span>
                  <div className="pt-5">
                    <button onClick={()=>{removeitem(value.cart_id)}} className="p-3 bg-green-300 text-white rounded-md mr-5">
                      REMOVE FROM CART
                    </button>
                    <button className="p-3 bg-green-300 text-white rounded-md">
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="border-2 w-96  h-fit">
          <p className="text-lg font-semibold text-gray-500 border-b-2 p-5">
            PRICE DETAILS
          </p>
          <div className="font-medium p-5 border-b-2">
            <div className="flex justify-between ">
              <p>Price({total && total.items}item)</p>
              <p>Rs.{total && total.orginal}</p>
            </div>
            <div className="flex justify-between pt-3">
              <p>Discount</p>
              <p  className="text-green-400">-Rs{total && total.orginal - total.offer}</p>
            </div>
          </div>
          <div className="p-5 flex justify-between text-lg font-semibold border-b-2">
            <p>Total Amount</p>
            <p>Rs.{total&&total.offer}</p>
          </div>
          <p className="p-5 font-semibold text-green-400">You will save Rs.{total && total.orginal - total.offer} on this order</p>
          <div className="flex justify-center pb-10"><button onClick={handlepay} className="p-3 bg-green-300 text-white rounded-md">Place Order</button></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
