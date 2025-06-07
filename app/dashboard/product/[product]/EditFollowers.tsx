import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

function EditFollowers({ setFollowers, followers }: any) {
    const [loading, setLoading] = useState(false);

    const handleUpdateFollowers = async (e: React.FormEvent) => {
    e.preventDefault();
    }
  return (
    <form onSubmit={handleUpdateFollowers} className="mt-1 flex items-end gap-2">
      <div>
        <label className="text-sm" htmlFor="followers">
          Followers
        </label>
        <Input
          id="followers"
          name="followers"
          required
          type="number"
          onChange={(e) => setFollowers(e.target.value)}
          value={followers}
          placeholder="No. of Followers"
        />
      </div>
      <Button>Update</Button>
    </form>
  );
}

export default EditFollowers;
