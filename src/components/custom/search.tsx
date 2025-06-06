"use client";

import { Input } from "@/components/ui/input";
import { useAllUsers } from "@/state";
import { useState, useEffect } from "react";

export default function SearchUser() {
  const { users, setUsers, setFilteredUsers } = useAllUsers((state) => state);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!searchValue) {
      setFilteredUsers(users);
    }
  }, [searchValue]);

  function handleOnChange(e: any) {
    setSearchValue(e.target.value.toLowerCase());

    if (searchValue) {
      const filteredUsers = users.filter(
        (item: any) =>
          item?.username.toLowerCase().includes(searchValue) ||
          item?.fullname.toLowerCase().includes(searchValue)
      );

      setFilteredUsers(filteredUsers);
    }
  }

  return (
    <div className="w-full padding pb-4 pt-6">
      <Input
        className="w-full rounded-md mx-auto bg-slate-800 border border-purple-200/[0.2] shadow-2xl focus:border-purple-200/[0.6] transition-all duration-200"
        placeholder="search..."
        value={searchValue}
        onChange={handleOnChange}
      />
    </div>
  );
}
