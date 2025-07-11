"use client";
import { Form, Formik } from "formik";
import React from "react";
import Link from "next/link";
import { loginInitialValues } from "@/lib/formInitialValues";
import { loginValidationSchema } from "@/lib/formValidations";
import apiClient from "@/lib/apiClient";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const UserLogin = () => {
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    console.log(values);
    const response: any = await apiClient.post("customer/login", values);
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(response.data.customer));
      toast.success("Logged in Successfully");
      router.push("/user-dashboard");
    } else {
      toast.error(response.data.error || "Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex  h-screen w-full ">
      <div className="w-full lg:w-1/2 flex flex-col mx-auto  h-full  p-6 md:px-12 lg:px-36">
        <div className="flex items-center justify-center mb-3">
          <Image
            src={"/logo.png"}
            className=""
            alt="logo"
            width={170}
            height={170}
          />
        </div>
        <div className="">
          <Formik
            initialValues={loginInitialValues}
            validationSchema={loginValidationSchema}
            onSubmit={(values: any) => handleSubmit(values)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form className="flex flex-col gap-4 ">
                <div className="">
                  <h1 className="text-black text-xl md:text-2xl">
                    Customer Login
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Please sign in using your credentials
                  </p>
                </div>
                <div className="mt-3 lg:mt-8">
                  <label className="text-sm" htmlFor="email">
                    Enter Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Email Address"
                  />
                  <p className="text-red-500 text-xs">
                    {errors.email && touched.email && String(errors.email)}
                  </p>
                </div>
                <div className="mb-2">
                  <label className="text-sm" htmlFor="password">
                    Enter Password
                  </label>
                  <Input
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                    id="password"
                    type="password"
                  />
                  <p className="text-red-500 text-xs">
                    {errors.password &&
                      touched.password &&
                      String(errors.password)}
                  </p>
                </div>

                <Button disabled={isSubmitting ? true : false}>
                  {isSubmitting ? "Loading..." : "Log In"}
                </Button>
                <Link
                  className="w-full flex items-center cursor-pointer justify-center"
                  href="/u/register"
                >
                  <Button variant="outline" className="w-full">
                    Register
                  </Button>
                </Link>
                <Link
                  className="w-full flex items-center justify-center"
                  href="/"
                >
                  <Button variant="ghost">Cancel</Button>
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
