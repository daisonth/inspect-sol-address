'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from 'lucide-react';
import { useState } from "react";

import { useRouter } from "next/navigation";

export function Search() {
  const router = useRouter();
  const [address, setAddress] = useState("");

  return (
    <div className="flex">
      <Input
        type="search"
        placeholder="Soalan Address...."
        className="h-9 w-48 lg:w-[300px] mx-3 bg-white border-black rounded-r-none mr-0"
        onChange={event => setAddress(event.currentTarget.value)}
      />
      <Button onClick={() => router.push(`/${address}`)} type="submit" className="group p-0 h-9 bg-white hover rounded-l-none border-black border border-l-0">
        <SearchIcon className="text-black group-hover:text-inherit m-0 h-4 w-8" />
      </Button>
    </div>
  )
}
