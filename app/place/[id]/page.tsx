import { notFound } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { places } from "@/data/mockData";
import CommentSection from "@/components/CommentSection";
import EmployeeReviews from "@/components/EmployeeReviews";

export default async function PlaceDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const place = places.find((p) => p.id === id);

  if (!place) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold">{place.name}</CardTitle>
              <Badge variant="secondary" className="mt-2">
                {place.category}
              </Badge>
            </div>
            <div className="text-2xl font-bold text-yellow-400">
              {place.rating.toFixed(1)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Image
            src={place.image || "/placeholder.svg"}
            alt={place.name}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600 mb-4">{place.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Dirección:</h3>
              <p>{place.address}</p>
            </div>
            <div>
              <h3 className="font-semibold">Teléfono:</h3>
              <p>{place.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="comments" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comments">Comentarios</TabsTrigger>
          <TabsTrigger value="reviews">Reseñas de Empleados</TabsTrigger>
        </TabsList>
        <TabsContent value="comments">
          <CommentSection placeId={place.id} />
        </TabsContent>
        <TabsContent value="reviews">
          <EmployeeReviews placeId={place.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
