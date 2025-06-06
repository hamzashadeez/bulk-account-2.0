"use client";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { EditProduct } from "./EditProduct";

function SingleProduct() {
  const { product } = useParams();
  const [productData, setProductData]: any = React.useState(null);
  const getProduct = async () => {
    const res: any = await apiClient.get(`/product/${product}`);
    if (res.ok) {
      console.log(res.data);
      setProductData(res.data);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  console.log(product);
  return (
    <div className="w-5/6 mx-auto my-10">
      <h2 className="text-lg mb-5 uppercase font-medium text-green-700">
        Account Details
      </h2>
      <h1 className="">
        Platform:{" "}
        <span className="font-semibold text-green-700 text-lg uppercase">
          {productData?.platform}
        </span>
      </h1>
      <p>
        Followers:{" "}
        <span className="font-semibold text-lg text-green-700">
          {productData?.followers}
        </span>
      </p>
      <p>
        Following:{" "}
        <span className="font-semibold text-lg text-green-700">
          {productData?.following}
        </span>
      </p>
      <p>
        Price:{" "}
        <span className="font-semibold text-lg text-green-700">
          ₦{productData?.price.toLocaleString()}
        </span>
      </p>

      <div className="mt-10 flex gap-6 items-center justify-center">
        <EditProduct data={productData} />
        <Button className="cursor-pointer" variant={"destructive"}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default SingleProduct;
