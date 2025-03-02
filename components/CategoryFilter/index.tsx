"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChefHat, Clapperboard, LucideProps, Store, Trees } from "lucide-react";
import {
  useSearchParams,
  useParams,
  useRouter,
  usePathname,
} from "next/navigation";
// import { URLSearchParams } from "node:url";

type Category = {
  id: string;
  name: string;
};

type CategoryFilterProps = {
  categories: Category[];
};

const icons: Record<string, React.FC<LucideProps>> = {
  restaurantes: ChefHat,
  tiendas: Store,
  cines: Clapperboard,
  parques: Trees,
};

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const parhname = usePathname();
  const { replace } = useRouter();

  const handleFilterCategory = (categoryName: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryName) {
      params.set("filter", categoryName.toLowerCase());
    } else {
      params.delete("filter");
    }

    replace(`${parhname}?${params.toString()}`);
    console.log(params);
  };

  return (
    <div className="w-full max-w-[700px] h-[70px] flex justify-around">
      {categories.map((category) => {
        const nameCategory = category.name.toLowerCase();
        const Icon = icons[nameCategory];
        return (
          <div
            className="flex flex-col justify-center items-center cursor-pointer"
            key={category.id}
            onClick={() => handleFilterCategory(category.name)}
          >
            <Icon /> {category.name}
          </div>
        );
      })}
    </div>
  );
}
