import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import PlaceCard from "../components/PlaceCard";
import { places, categories } from "../data/mockData";

export default function Home() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">
        Descubre lugares increíbles
      </h2>
      <div className="flex flex-col justify-between items-center gap-4">
        <SearchBar />
        <CategoryFilter categories={categories} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}
