"use server";
import { redirect } from "next/navigation";
import db from "../utils/db";
import { currentUser } from "@clerk/nextjs/server";

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

export const createProductAction__ = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const answer = { message: "product created from SCR" };
  const name = formData.get("name");
  const price = formData.get("price");
  const image = formData.get("image");
  const description = formData.get("description");
  console.log("answer", answer);
  await new Promise((resolve) => setTimeout(resolve, 15000));
  return answer;
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return { message: error instanceof Error ? error.message : "there was an error" };
};

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  // const answer = { message: "product created from SCR" };

  await new Promise((resolve) => setTimeout(resolve, 5000));

  // TS ERROR
  const user = await getAuthUser();

  try {
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const price = Number(formData.get("price") as string);
    //temp
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;
    const featured = Boolean(formData.get("featured") as string);

    await db.product.create({
      data: {
        name,
        company,
        price,
        image: "../public/img1.jpeg",
        description,
        featured,
        clerkId: user.id,
      },
    });

    return { message: "product created" };
  } catch (error) {
    console.log(error);
    // hard code error unknown
    return renderError(error);
    // return { message: error instanceof Error ? error.message : "there was an error" };
  }
  // console.log("answer", answer, { name, price, image });
  // return answer;
};
