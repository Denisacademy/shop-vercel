"use server";
import { redirect } from "next/navigation";
import db from "../utils/db";
import { currentUser } from "@clerk/nextjs/server";
// import img5 from "../public/img5.jpeg";
import img4 from "@/public/img4.jpeg";
import { z, ZodSchema } from "zod";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";
import { uploadImage } from "./supabase";
// IT IS MORE EXPLICIT
export const fetchFeaturedProducts = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  //setTimeout(() => console.log("waitng"), 5000);
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
    // select property
    // select: {
    // name: true,
    // },
  });
  //console.log(products);
  return products;
};

// ANOTHER APPROACH
export const fetchAllProducts = ({ search = "" }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [
        { name: { startsWith: search, mode: "insensitive" } },
        { company: { startsWith: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    redirect("/products");
  }

  return product;
};

// AUTH
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};
// ERROR MESSAGE
const renderError = (error: unknown): { message: string } => {
  return { message: error instanceof Error ? error.message : "there was an error" };
};

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  // const answer = { message: "product created from SCR" };

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validateFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validateFile.image);

    await db.product.create({
      data: {
        ...validatedFields,
        // image: "/images/img15.jpg",
        image: fullPath,
        clerkId: user.id,
      },
    });

    // return { message: "product created" };
  } catch (error) {
    console.log("Error-catch", error);
    // hard code error unknown
    return renderError(error);
    // return { message: error instanceof Error ? error.message : "there was an error" };
  }
  redirect("/admin/products");
};
