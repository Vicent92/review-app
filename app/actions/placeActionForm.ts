"use server"

import { z } from "zod";

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

export const submitPlaceForm = async (
    prevState: any,
    formData: FormData
  ): Promise<{
    success: boolean;
    errors: Record<string, string> | null;
  }> => {
    // Convertir FormData a objeto
    const data = Object.fromEntries(formData);
  
    // Validar con Zod
    const result = placeFormSchema.safeParse(data);
  
    if (!result.success) {
      // Formatear errores de Zod
      const errors = result.error.issues.reduce((acc, issue) => {
        const path = issue.path[0] as string;
        acc[path] = issue.message;
        return acc;
      }, {} as Record<string, string>);
  
      return {
        success: false,
        errors,
      };
    }
  
    try {
      // Aquí iría la lógica real del servidor, como guardar en BD
      // Por ejemplo:
      // await db.contact.create({ data: result.data });
      
      // Simulamos una operación asíncrona
      await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Formulario enviado", result.data);
      return {
        success: true,
        errors: null,
      };
    } catch (error) {
      return {
        success: false,
        errors: { server: "Error en el servidor" },
      };
    }
  }