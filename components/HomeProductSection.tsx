"use client"
import apiClient from '@/lib/apiClient';
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
    <div className='py-12 px-4 md:px-8 lg:px-24'>
        <h3>Our Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: any) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
            <h4 className="text-lg font-semibold mb-2">{product.platform}</h4>
            <p className="text-gray-600">Followers: {product.followers}</p>
            <p className="text-gray-600">Following: {product.following}</p>
            <p className="text-green-700 font-bold">₦{product.price.toLocaleString()}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Buy Now
            </button>
        </div>
        ))}
        </div>
    </div>
  )
}

export default HomeProductSection