"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de búsqueda
    console.log("Buscando:", search);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full justify-center items-center space-x-2"
    >
      <Input
        className="w-[700px] h-[50px]"
        type="text"
        placeholder="Buscar lugares..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
