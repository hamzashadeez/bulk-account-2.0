"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "@/lib/apiClient";
import { productInitialValues } from "@/lib/formInitialValues";
import { productValidationSchema } from "@/lib/formValidations";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function NewProductClient() {
    const router = useRouter();
  const handleSubmit = async (values: any) => {
      const data = {price: Number(values.price), platform: values.platform, followers: Number(values.followers), following: Number(values.following)};
      console.log(data);
      const res: any = await apiClient.post("/product", data);
      if(res.ok) {
        console.log(res);
        toast.success("Product added successfully")
        router.push("/dashboard");
      } else {
        console.log(res);
        alert(res.data.error || "Something went wrong");
      }
  };
  return (
    <div className="w-4/5 md:w-1/2 mx-auto  py-10 px-4">
      <h1 className="text-2xl font-regular">New Product</h1>
      <Formik
        initialValues={productInitialValues}
        validationSchema={productValidationSchema}
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
            <div className="mt-1 ">
              <label className="text-sm" htmlFor="email">
                Followers
              </label>
              <Input
                id="followers"
                name="followers"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.followers}
                placeholder="No. of Followers"
              />
              <p className="text-red-500 text-xs">
                {errors.followers &&
                  touched.followers &&
                  String(errors.followers)}
              </p>
            </div>

            <div className="mt-1 ">
              <label className="text-sm" htmlFor="email">
                Following
              </label>
              <Input
                id="following"
                name="following"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.following}
                placeholder="No. of Following"
              />
              <p className="text-red-500 text-xs">
                {errors.following &&
                  touched.following &&
                  String(errors.following)}
              </p>
            </div>

            <div className="mt-1 ">
              <label className="text-sm" htmlFor="platform">
                Platform
              </label>
              <Select
                name="platform"
                value={values.platform}
                onValueChange={(value) =>
                  handleChange({ target: { name: "platform", value } })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Platforms</SelectLabel>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="x">Twitter (X)</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <p className="text-red-500 text-xs">
                {errors.platform && touched.platform && String(errors.platform)}
              </p>
            </div>

            <div className="mt-1 ">
              <label className="text-sm" htmlFor="email">
                Price
              </label>
              <Input
                id="price"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                placeholder="Price"
              />
              <p className="text-red-500 text-xs">
                {errors.price && touched.price && String(errors.price)}
              </p>
            </div>

            <Button className="cursor-pointer" type="submit" disabled={isSubmitting ? true : false}>
              {isSubmitting ? "Loading..." : "Add Product"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewProductClient;
