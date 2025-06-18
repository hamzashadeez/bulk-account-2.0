"use client";
import { Button } from "@/components/ui/button";
import { CircleCheck, Loader, ShoppingCart } from "lucide-react";
import React, { useEffect } from "react";

function UserDashboard() {
  // const [user, setUser] = React.useState<any>(null);
  // const getUser = () => {
  //   const user: any = localStorage.getItem("user");
  //   if (!user) {
  //     window.location.href = "/u/login";
  //   }
  //   const userData = JSON.parse(user);
  //   setUser(userData);
  // }

  // useEffect(()=>{
  //   getUser();
  // }, [])
  return (
    <main className="min-h-screen w-full bg-gray-100 w-full">
      <div className="min-h-screen w-full  p-5 md:p-10 md:w-2/3 lg:w-1/2 mx-auto">
        <header>
          <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
          <p className="text-gray-600">
            Welcome to your dashboard. Here you can manage your account
            settings, view your activity, and more.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-4 w-full mt-5">
            <div className="p-5 flex-1 shadow-sm bg-gradient-to-t from-orange-400 via-orange-500 to-orange-600 text-white rounded-lg flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Loader />
            </div>
            <div className="">
              <p>Pending Orders</p>
              <h1 className="text-3xl font-medium">0</h1>
            </div>
          </div>
          <div className="p-5 flex-1 shadow-sm bg-gradient-to-t from-green-400 via-green-500 to-green-600 text-white rounded-lg flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <CircleCheck />
            </div>
            <div className="">
              <p>Completed Orders</p>
              <h1 className="text-3xl font-medium">0</h1>
            </div>
          </div>
        </div>

        <div className="mt-5">
          
          <div className="p-5 col-span-2 shadow-sm bg-gradient-to-t from-purple-400 via-purple-500 to-purple-600 text-white rounded-lg flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <ShoppingCart />
            </div>
            <div className="">
              <p>Your Cart</p>
              <Button className="bg-white text-black mt-2">Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserDashboard;
