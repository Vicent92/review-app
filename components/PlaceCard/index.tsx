import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Place = {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
};

type PlaceCardProps = {
  place: Place;
};

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Link href={`/place/${place.id}`} className="block">
      <Card className="overflow-hidden w-[300px] border-0">
        <Image
          src={place.image || "/placeholder.svg"}
          alt={place.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded"
        />
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">{place.name}</h2>
          <Badge variant="secondary" className="mt-2">
            {place.category}
          </Badge>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-sm text-muted-foreground">
            Rating: {place.rating.toFixed(1)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
