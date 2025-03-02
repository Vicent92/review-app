"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const parhname = usePathname();
  const { replace } = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (searchName: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchName) {
      params.set("filter", searchName.toLowerCase());
    } else {
      params.delete("filter");
    }

    replace(`${parhname}?${params.toString()}`);
  };

  return (
    <form className="flex w-full justify-center items-center space-x-2">
      <Input
        className="w-[700px] h-[50px]"
        type="text"
        placeholder="Buscar lugares..."
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Button type="submit" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
