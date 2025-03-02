"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "lucide-react";

type Review = {
  id: string;
  user: string;
  content: string;
  date: string;
  rating: number;
  employeeName: string;
};

type EmployeeReviewsProps = {
  placeId: string;
};

export default function EmployeeReviews({ placeId }: EmployeeReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      user: "Usuario1",
      content: "Excelente atención por parte de este empleado.",
      date: "2023-06-15",
      rating: 5,
      employeeName: "Juan Pérez",
    },
    {
      id: "2",
      user: "Usuario2",
      content: "Buen servicio, pero podría mejorar en algunos aspectos.",
      date: "2023-06-14",
      rating: 4,
      employeeName: "María González",
    },
  ]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [employeeName, setEmployeeName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.trim() && newRating > 0 && employeeName.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        user: "Usuario Actual",
        content: newReview.trim(),
        date: new Date().toISOString().split("T")[0],
        rating: newRating,
        employeeName: employeeName.trim(),
      };
      setReviews([review, ...reviews]);
      setNewReview("");
      setNewRating(0);
      setEmployeeName("");
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Reseñas de Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employee-name">Nombre del empleado</Label>
              <Input
                id="employee-name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="Nombre del empleado"
              />
            </div>
            <div className="space-y-2">
              <Label>Calificación</Label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${star <= newRating ? "text-yellow-400" : "text-gray-300"}`}
                    onClick={() => setNewRating(star)}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="review-content">Tu reseña</Label>
              <Textarea
                id="review-content"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Escribe tu reseña..."
              />
            </div>
            <Button type="submit">Enviar reseña</Button>
          </form>
        </CardContent>
      </Card>
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.user}`}
                />
                <AvatarFallback>{review.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-medium">
                  {review.user}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Empleado: {review.employeeName}</p>
            <div className="flex space-x-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p>{review.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
