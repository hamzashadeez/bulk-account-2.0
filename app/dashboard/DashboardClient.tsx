"use client";
import apiClient from "@/lib/apiClient";
import { BadgeDollarSign, ShoppingCart, Sparkles } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

function DashboardClient() {
  const [products, setProducts]: any = React.useState([]);
  const [availableProducts, setAvailableProducts] = React.useState([]);
  const [businessWorth, setBusinessWorth] = React.useState(0);
  const getProducts = async () => {
    let aval: any = [];

    const res: any = await apiClient.get("/product");
    if (res.ok) {
      setProducts(res.data);
      console.log(res.data);
      res.data.forEach((product: any) => {
        // Calculate business worth
        setBusinessWorth((prevWorth) => prevWorth + product.price);
        if (product.available) {
          aval.push(product);
        }
      });

      setAvailableProducts(aval);
    } else {
      console.log(res);
      throw new Error("Failed to fetch products");
    }
  };

  React.useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="max-h-[200px] w-full bg-green-50 aspect-video rounded-xl flex items-center justify-start  gap-6 px-6">
          <div className="flex items-center justify-center w-16 h-16 bg-green-600/20 rounded-full">
            <ShoppingCart className="text-green-700" />
          </div>
          <div className="">
            <p className="text-4xl font-semibold text-green-700">
              {products.length}
            </p>
            <h2 className="text-2xl font-medium text-gray-700">
              Total Products
            </h2>
          </div>
        </div>
        <div className="max-h-[200px] w-full overflow-hidden bg-orange-50 aspect-video rounded-xl">
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-start  gap-6 px-6">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-600/20 rounded-full">
              <Sparkles className="text-orange-700" />
            </div>
            <div className="">
              <p className="text-4xl font-semibold text-orange-700">
                {availableProducts.length}
              </p>
              <h2 className="text-2xl font-medium text-gray-700">
                Available Products
              </h2>
            </div>
          </div>
        </div>
        <div className="max-h-[200px] w-full overflow-hidden bg-blue-50 aspect-video rounded-xl">
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-start  gap-6 px-6">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full">
              <BadgeDollarSign className="text-blue-700" />
            </div>
            <div className="">
              <p className="text-4xl font-semibold text-blue-700">
                ₦{businessWorth.toLocaleString()}
              </p>
              <h2 className="text-2xl font-medium text-gray-700">
                Business Worth
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted/50  rounded-xl h-[400px]  p-4">
        <h1 className="text-xl font-medium text-gray-700 mb-6">
          Recently Added Products
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Platform</TableHead>
              <TableHead>Followers</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">#</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.slice(0, 5).map((product: any) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium capitalize">
                  {product.platform}
                </TableCell>
                <TableCell>{product.followers.toLocaleString()}</TableCell>
                <TableCell>₦{product.price.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  {product.available && (
                    <p className="text-green-600 text-xs">Available</p>
                  )}
                  {!product.available && (
                    <p className="text-red-600 text-xs">Unavailable</p>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/dashboard/product/${product._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DashboardClient;
