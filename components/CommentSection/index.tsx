"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { StarIcon } from "lucide-react";

type Comment = {
  id: string;
  user: string;
  content: string;
  date: string;
  rating: number;
};

type CommentSectionProps = {
  placeId: string;
};

export default function CommentSection({ placeId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "Usuario1",
      content: "Excelente lugar, muy buena atención.",
      date: "2023-06-15",
      rating: 4,
    },
    {
      id: "2",
      user: "Usuario2",
      content: "Las instalaciones están muy bien mantenidas.",
      date: "2023-06-14",
      rating: 5,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && newRating > 0) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: "Usuario Actual",
        content: newComment.trim(),
        date: new Date().toISOString().split("T")[0],
        rating: newRating,
      };
      setComments([comment, ...comments]);
      setNewComment("");
      setNewRating(0);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Comentarios</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario..."
            />
            <Button type="submit">Enviar comentario</Button>
          </form>
        </CardContent>
      </Card>
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.user}`}
                />
                <AvatarFallback>{comment.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-medium">
                  {comment.user}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{comment.date}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${star <= comment.rating ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p>{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
