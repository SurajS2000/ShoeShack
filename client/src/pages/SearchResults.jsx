import React, { useEffect, useState } from "react";
import ProductBox from "../components/ProductBox";
import { useLocation } from "react-router-dom";
import { publicInstance } from "../api/api";

const SearchResults = () => {
  const location = useLocation();
  const [data, setdata] = useState([]);
  useEffect(() => {
    publicInstance
      .get(`search?search=${location.state.search}`)
      .then((response) => {
        setdata(response.data);
      });
  }, [location.state.search]);
  return (
    <div className="min-h-screen">
      <h1 className="text-green-400 pt-20 pl-10 text-xl">
        Search result for '{location.state.search}'
      </h1>
      <div className={`w-full  pt-40 text-center ${data[0]?'hidden':'block'}`}>NO RESULT'S FOUND</div>
      <div className={`py-10 px-10 flex gap-5 flex-wrap ${data[0]?'flex':'hidden'}`}>
        {data &&
          data.map((value) => (
            <ProductBox value={value} key={value.product_id} />
          ))}
      </div>
    </div>
  );
};

export default SearchResults;
