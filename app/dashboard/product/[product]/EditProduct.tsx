import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import apiClient from "@/lib/apiClient";
import { productInitialValues } from "@/lib/formInitialValues";
import { Select } from "@radix-ui/react-select";
import { Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import EditFollowers from "./EditFollowers";

export function EditProduct({ data }: any) {
  const [followers, setFollowers] = useState(data?.followers );
  const [following, setFollowing] = useState(data?.following);
  const [platform, setPlatform] = useState(data?.platform);
  const [price, setPrice] = useState(data?.price);
  const [available, setAvailable] = useState(data?.available || true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedData = {
      followers: Number(followers),
      following: Number(following),
      platform,
      price: Number(price),
      available,
    };
    console.log(updatedData);
    const res: any = await apiClient.put(`/product/${data._id}`, updatedData);

    if (res.ok) {
        setIsSubmitting(false);
      console.log(res.data);
      toast.success("Product updated successfully");
      // Optionally, you can refresh the page or redirect
      window.location.reload();
    } else {
        setIsSubmitting(false);
      console.error(res.data.error || "Something went wrong");
      toast.error(res.data.error || "Something went wrong");
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Update Product</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div  className="flex flex-col gap-4 ">
            <EditFollowers setFollowers={setFollowers} followers={followers} />

            <div className="mt-1 ">
              <label className="text-sm" htmlFor="following">
                Following
              </label>
              <Input
                id="following"
                name="following"
                onChange={(e) => setFollowing(e.target.value)}
                value={following}
                placeholder="No. of Following"
              />
            </div>

            <div className="mt-1 ">
              <label className="text-sm" htmlFor="platform">
                Platform
              </label>
              <Select
                name="platform"
                value={data?.platform}
                onValueChange={(value) => setPlatform(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={data?.platform} />
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
            </div>

            <div className="mt-1 ">
              <label className="text-sm" htmlFor="email">
                Price
              </label>
              <Input
                id="price"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                // onBlur={handleBlur}
                value={data?.price.toLocaleString()}
                placeholder="Price"
              />
            </div>

             <div className="mt-1 ">
              <label className="text-sm" htmlFor="available">
                Availability
              </label>
              <Select
                name="available"
                value={data?.platform}
                onValueChange={(value) => setAvailable(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={data?.available} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Product Availability</SelectLabel>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="not-available">Not Available</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button className="cursor-pointer" type="submit">
              {"Update Product"}
            </Button>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
