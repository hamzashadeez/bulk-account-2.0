import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="relative bg-primary/20 py-10 ">
        <img src="/Elipse1.png" className="absolute top-0 left-0 -z-[-1] w-[100px] md:w-[170px]" alt="" />
        <img src="/Elipse.png" className="absolute bottom-0 right-0 -z-[-1] w-[150px] md:w-[240px]" alt="" />
      <div className="w-5/6 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <img
            src="/logo_.svg"
            className="w-[120px] mb-3 md:w-[150px] z-10"
            alt=""
          />
          <Link className="text-sm text-gray-600 z-10" href="#">
            About
          </Link>
          <Link className="text-sm text-gray-600 z-10" href="#">
            Contact
          </Link>
        </div>
        {/*  */}
        <div className="">
          <h3 className="font-medium mb-2">Info</h3>
          <ul>
            <li>
              <Link className="text-xs text-gray-600" href="#">
                Delivery
              </Link>
            </li>
            <li>
              <Link className="text-xs text-gray-600" href="#">
                Warranty
              </Link>
            </li>
            <li>
              <Link className="text-xs text-gray-600" href="#">
                Support
              </Link>
            </li>
            <li>
              <Link className="text-xs text-gray-600" href="#">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="text-xs text-gray-600" href="#">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/*  */}
        <div className="">
          <h3 className="font-medium mb-2">Shops</h3>
          <ul>
            <li>
              <Link className="text-xs text-gray-600" href="#">
                Katsina
              </Link>
            </li>
          </ul>
        </div>
        {/*  */}
       
      </div>
    </footer>
  );
}

export default Footer;
