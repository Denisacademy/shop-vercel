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
// export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
export function validateWithZodSchema<T>(schema: ZodType<T, any, any>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  console.log("validateWithZodSchema", result);
  return result.data;
}

const test = z.object({
  name: z.string(),
  age: z.number().min(18),
});

console.log("yeah", test instanceof ZodType, test instanceof ZodSchema);
