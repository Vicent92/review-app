"use server"

import { z } from "zod";

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

export const submitProfileForm = async (
    prevState: any,
    formData: FormData
  ): Promise<{
    success: boolean;
    errors: Record<string, string> | null;
  }> => {
    // Convertir FormData a objeto
    const data = Object.fromEntries(formData);
  
    // Validar con Zod
    const result = profileFormSchema.safeParse(data);
  
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