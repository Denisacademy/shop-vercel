import { z, ZodSchema, ZodType } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must be at least 2 characters." })
    .max(100, { message: "name must be less than 100 characters." }),
  company: z.string(),
  featured: z.coerce.boolean(),
  //from input text
  price: z.coerce.number().int().min(0, {
    message: "price must be a positive number.",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      // console.log("wordCount", wordCount);
      // if return true we passed validation othwerwise messaf error
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
});

// const validatedFields = validateWithZodSchema(productSchema, rawData);
//    points that schema is ZodSchema<OurSchema>   for multiplie schemas return props in schema
export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  // export function validateWithZodSchema<T>(schema: ZodType<T, any, any>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  // console.log("validateWithZodSchema", result, "true", "created obj");
  return result.data;
}

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const maxUploadSize = 256 * 256;
  const acceptedFileTypes = ["image/"];

  return z
    .instanceof(File)
    .refine((file) => {
      console.log("MaxUploadSize-refine", maxUploadSize, file.size < 10);
      // return file.size < 1;
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 1mb")

    .refine((file) => {
      return !file || acceptedFileTypes.some((type) => file.type.startsWith(type));
    }, "File must be an image");
}
