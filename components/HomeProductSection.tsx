"use client"
import apiClient from '@/lib/apiClient';
import Link from 'next/link';
import React, { useEffect } from 'react'


function HomeProductSection() {
  const [products, setProducts]: any = React.useState([]);

     const getProducts = async () => {
    let aval: any = [];

    const res: any = await apiClient.get("/product");
    if (res.ok) {
      setProducts(res.data);
      console.log(res.data);
      
    } else {
      console.log(res);
      throw new Error("Failed to fetch products");
    }
  };

  useEffect(() => { 
    getProducts();
  }, []);


  return (
    <div className='py-12 px-4 md:px-8 lg:px-24 bg-gray-100'>
        <h3 className='text-center mb-10 font-semibold text-lg'>Our Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md p-4 w-full">
            <img src="/logo.jpg" alt="" />
            <h4 className="text-lg font-semibold mb-2 capitalize">Platform: {product.platform}</h4>
            <p className="text-gray-600">Followers: {product.followers.toLocaleString()}</p>
            <p className="text-gray-600">Following: {product.following.toLocaleString()}</p>
            <p className="text-green-700 font-bold">Price: ₦{product.price.toLocaleString()}</p>
            <p className='text-xs py-2 mb-5'>Status : {product.available ? "Available" : "Not Available"}</p>
            <Link href={`/p/${product._id}`} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              View Details
            </Link>
        </div>
        ))}
        </div>
    </div>
  )
}

export default HomeProductSection