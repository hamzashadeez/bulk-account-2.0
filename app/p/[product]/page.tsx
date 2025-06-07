"use client";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
// import { EditProduct } from "./EditProduct";

function SingleProduct() {
  const { product } = useParams();
  const [productData, setProductData]: any = React.useState(null);
  const [user, setUser]: any = React.useState(null);
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

  const getUserDetails = async () => {
    const res: any = await apiClient.get(`/user`);
    if (res.ok) {
      console.log(res.data);
      setUser(res.data);
    }
  }


  useEffect(() => {
    getUserDetails();
  }, []);

 
  return (
    <div className="w-5/6 md:w-3/5 mx-auto mb-10">
      <img src="/banner.jpg" alt="" className="w-full" />
      <div className="flex items-center justify-between">
        <h2 className="text-lg my-5 uppercase font-medium text-green-700">
        Account Details
      </h2>

      <Link className="text-sm bg-gray-200 my-5 uppercase font-medium text-gray-700 px-4 py-1.5" href="/">Home</Link>
      </div>
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

      <section className="my-10 py-5 bg-blue-100 rounded-md px-5">
        Please note that the price is negotiable, and you can contact us for more information.
        <br />
        Use the account details below to make the purchase:

        <br />
        <br />
        <span className="font-semibold">Account Name: {user?.accountName}</span><br /><br />
        <span className="font-semibold">Bank Name: {user?.bank}</span><br /><br />
        <span className="font-semibold">Account Number: {user?.accountNumber}</span><br /><br /><br />
        After making the payment, please send us a screenshot of the transaction to our WhatsApp number:<br />
        <span className="font-semibold">{user?.phone}</span>

        <br />
      </section>
     
    </div>
  );
}

export default SingleProduct;
