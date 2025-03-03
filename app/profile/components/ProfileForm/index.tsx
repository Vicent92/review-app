"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { ImageUpload } from "@/components/ImageUpload";
import { Label } from "@/components/ui/label";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "El nombre de usuario debe tener al menos 2 caracteres.",
    })
    .max(30, {
      message: "El nombre de usuario no debe tener más de 30 caracteres.",
    }),
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Por favor ingresa una URL válida." }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  username: "johndoe",
  email: "johndoe@example.com",
  bio: "Soy un amante de la buena comida y siempre estoy en busca de nuevos lugares para probar.",
  urls: [
    { value: "https://twitter.com/johndoe" },
    { value: "https://instagram.com/johndoe" },
  ],
};

export const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("https://github.com/shadcn.png");

  const handleImageUpload = (file: File) => {
    // Simular carga de imagen
    setTimeout(() => {
      setAvatarUrl(URL.createObjectURL(file));
      toast({
        title: "Imagen de perfil actualizada",
        description: "Tu nueva imagen de perfil ha sido guardada.",
      });
    }, 1500);
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={avatarUrl} alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-bold">
              Perfil de Usuario
            </CardTitle>
            <CardDescription>
              Gestiona tu información personal y preferencias
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-8">
          {isEditing && (
            <ImageUpload
              onImageUpload={handleImageUpload}
              label="Imagen de perfil"
            />
          )}
          <div className="space-y-2">
            <Label>Nombre de usuario</Label>
            <Input
              defaultValue={defaultValues.username}
              disabled={!isEditing}
            />
            <Label>
              Este es tu nombre público. Puede ser tu nombre real o un
              seudónimo.
            </Label>
          </div>
          <div className="space-y-2">
            <Label>Correo electrónico</Label>
            <Input defaultValue={defaultValues.email} disabled={!isEditing} />
            <Label>
              Tu correo electrónico no será compartido públicamente.
            </Label>
          </div>
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              placeholder="Cuéntanos un poco sobre ti"
              className="resize-none"
              disabled={!isEditing}
              defaultValue={defaultValues.bio}
            />
            <Label>Puedes usar hasta 160 caracteres.</Label>
          </div>
          {isEditing && <Button type="submit">Guardar cambios</Button>}
        </form>
      </CardContent>
      <CardFooter>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Editar perfil</Button>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
