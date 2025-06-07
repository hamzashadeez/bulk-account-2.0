"use client";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

function EditAccountNumber() {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [input, setInput] = React.useState<string>("");
  const getUserDetails = async () => {
    const res: any = await apiClient.get("user");
    if (res.ok) {
      setUser(res.data);
      setInput(res.data?.accountNumber);
      console.log(res.data);
    } else {
      console.error(res.data.error || "Failed to fetch user details");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res: any = await apiClient.put("user", { accountNumber: input });
    if (res.ok) {
      setLoading(false);
      toast.success("Account Number updated successfully");
      // window.location.reload();
    } else {
      console.error(res.data.error || "Failed to update account number");
      setLoading(false);
      toast.error(res.data.error || "Failed to update account number");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-4 mb-6">
      <label className="font-semibold text-sm">Account Number</label>
      <div className="flex flex-col gap-3">
        <input
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {loading ? (
          <Button disabled variant="ghost">
            Updating...
          </Button>
        ) : (
          <Button type="submit">Update</Button>
        )}
      </div>
    </form>
  );
}

export default EditAccountNumber;
