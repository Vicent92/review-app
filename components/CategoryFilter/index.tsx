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

type Category = {
  id: string;
  name: string;
};

type CategoryFilterProps = {
  categories: Category[];
};

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const icons: Record<string, React.FC<LucideProps>> = {
    restaurantes: ChefHat,
    tiendas: Store,
    cines: Clapperboard,
    parques: Trees,
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Aquí iría la lógica para filtrar por categoría
    console.log("Categoría seleccionada:", value);
  };

  return (
    <div className="w-full max-w-[700px] h-[70px] flex justify-around">
      {categories.map((category) => {
        const nameCategory = category.name.toLowerCase();
        const Icon = icons[nameCategory];
        return (
          <div
            className="flex flex-col justify-center items-center"
            key={category.id}
          >
            <Icon /> {category.name}
          </div>
        );
      })}
    </div>
  );
}
