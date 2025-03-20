"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ImageUpload";
import { Label } from "@/components/ui/label";
import { submitPlaceForm } from "../../../actions/placeActionForm";

const placeFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "El nombre del local debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "El nombre del local no debe tener más de 50 caracteres.",
    }),
  category: z.string({
    required_error: "Por favor selecciona una categoría.",
  }),
  description: z.string().max(500).min(10),
  address: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),
  phone: z.string().min(5, {
    message: "El número de teléfono debe tener al menos 5 caracteres.",
  }),
  website: z
    .string()
    .url({
      message: "Por favor ingresa una URL válida.",
    })
    .optional()
    .or(z.literal("")),
});

type PlaceFormValues = z.infer<typeof placeFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<PlaceFormValues> = {
  name: "Restaurante El Sabor",
  category: "restaurant",
  description:
    "Un restaurante acogedor con una amplia variedad de platos tradicionales.",
  address: "Calle Principal 123, Ciudad",
  phone: "+1234567890",
  website: "https://elsabor.com",
};

export const PlaceForm = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [state, formAction, isPending] = useActionState(
    submitPlaceForm,
    {
      success: false,
      errors: null,
    },
  )

  useEffect(() => {
    if (state.success) {
      setIsEditing(false);
    }
  }, [state.success]);

  const handleImageUpload = (file: File) => {
    // Simular carga de imagen
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      setImages([...images, imageUrl]);
      toast({
        title: "Imagen subida",
        description: "La imagen ha sido agregada a la galería del local.",
      });
    }, 1500);
  };

  return (
    <Card className="container w-[50%]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Gestión del Local</CardTitle>
        <CardDescription>
          Administra la información de tu establecimiento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-8">
          <div className="space-y-2">
            <Label>Nombre del local</Label>
            <Input defaultValue={defaultValues.name} disabled={!isEditing} name="name"/>
          </div>
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select defaultValue={defaultValues.category} disabled={!isEditing} name="category">
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restaurant">Restaurante</SelectItem>
                <SelectItem value="shop">Tienda</SelectItem>
                <SelectItem value="cinema">Cine</SelectItem>
                <SelectItem value="park">Parque</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea
              placeholder="Describe tu local"
              className="resize-none"
              disabled={!isEditing}
              defaultValue={defaultValues.description}
              name="description"
            />
            <Label>Máximo 500 caracteres.</Label>
          </div>
          <div className="space-y-2">
            <Label>Dirección</Label>
            <Input defaultValue={defaultValues.address} disabled={!isEditing} name="address"/>
          </div>
          <div className="space-y-2">
            <Label>Teléfono</Label>
            <Input defaultValue={defaultValues.phone} disabled={!isEditing} name="phone"/>
          </div>
          <div className="space-y-2">
            <Label>Sitio web</Label>
            <Input defaultValue={defaultValues.website} disabled={!isEditing} name="website"/>
            <Label>
              Opcional: Ingresa la URL de tu sitio web si tienes uno.
            </Label>
          </div>
          {isEditing && (
            <ImageUpload
              onImageUpload={handleImageUpload}
              label="Agregar imagen del local"
            />
          )}
          {images.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Imágenes del local</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Local ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
          {isEditing && <Button type="submit" onClick={() => setIsEditing(true)}>Guardar cambios</Button>}
        </form>
      </CardContent>
      <CardFooter>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Editar información</Button>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
