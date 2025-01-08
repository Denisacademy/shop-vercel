"use server";
import { redirect } from "next/navigation";
import db from "../utils/db";
import { currentUser } from "@clerk/nextjs/server";
// import img5 from "../public/img5.jpeg";
import img4 from "@/public/img4.jpeg";
import { z, ZodSchema } from "zod";
import { imageSchema, productSchema, reviewSchema, validateWithZodSchema } from "./schemas";
import { deleteImage, supabase, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import prisma from "../utils/db";
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

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) {
    redirect("/");
  }
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

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validateFile = validateWithZodSchema(imageSchema, { image: file });

    // load in supabase bucket our image
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

export const fetchAdminProducts = async () => {
  // is some cases we return value some check
  await getAdminUser();
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await getAdminUser();

  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    await deleteImage(product.image);
    revalidatePath("/admin/products");

    // message to toast
    return { message: "product removed" };
  } catch (error) {
    return renderError(error);
  }
};

// EDIT/PAGE PRODUCT
export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    redirect("/admin/products");
    // return { message: "product not found" };
  }
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  // ALL FIELDS
  const rawData = Object.fromEntries(formData);
  try {
    const productId = formData.get("id") as string;
    const validateData = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      // form has hidden input with id
      where: {
        id: productId,
      },
      data: { ...validateData },
    });

    revalidatePath("/admin/products/" + productId + "/edit");
    return { message: "product updated" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const file = formData.get("image") as File;
  const oldUrl = formData.get("url") as string;
  const id = formData.get("id") as string;

  const validateFile = validateWithZodSchema(imageSchema, { image: file });
  // show error data not validate
  try {
    if (!validateFile) {
      throw new Error("something went wrong");
    }
    console.log(formData);
    deleteImage(oldUrl);
    const newUrl = await uploadImage(validateFile.image);

    await db.product.update({
      where: { id },
      data: { image: newUrl },
    });

    revalidatePath("/admin/products/" + id + "/edit");
    return { message: "product image updated" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteId = async ({ productId, userId }: { productId: string; userId: string }) => {
  const user = await getAuthUser();
  // const user = await getAuthUser();
  //not alwaus helps Restart your typescript server in VSCode CTRL + SHIFT + P then type: restart TS Server
  // console.log(userId);
  // console.log(user);
  // const clerkId = userId;
  const favorite = await db.favorite.findFirst({
    where: {
      AND: [{ productId }, { clerkId: userId }],
      // productId,
      // clerkId: userId,
    },
    select: {
      id: true,
    },
  });
  // console.log("favorite", favorite);
  return favorite?.id;
};

export const toggleFavoriteAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  // const rawData = Object.fromEntries(formData);
  const productId = formData.get("productId") as string;
  const favoriteId = formData.get("favoriteId") as string;
  const urlName = formData.get("urlName") as string;

  // console.log("ActionPrevState", prevState, [productId, favoriteId, urlName]);

  if (favoriteId) {
    await db.favorite.delete({
      where: {
        id: favoriteId,
      },
    });
  } else {
    await db.favorite.create({
      data: {
        clerkId: user.id,
        productId,
      },
    });
  }
  revalidatePath(urlName); //pathname
  return { message: favoriteId ? "delete favorite" : "add favorite" };
};

export const getUserFavoriteProducts = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    // JOIN TABLE
    include: {
      //product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
      product: true,
    },
  });
  // revalidatePath("/favorites");
  return favorites;
};

export const getFavoriteUsersProduct = async () => {
  const current = "79d7695a-4b23-4c70-87d9-ddbacdcee82e";

  const users = await db.favorite.findMany({
    where: {
      productId: current,
    },
    select: {
      // product: true,
      clerkId: true,
    },
  });

  const product = await db.product.findFirst({
    where: {
      id: current,
    },
    select: {
      name: true,
      price: true,
      company: true,
    },
  });

  return { product, users };
};

// only my reviews in page and all reviews for one product

export const createReviewAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(reviewSchema, rawData);

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });
    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "Review submitted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    // select: {
    //   rating: true,
    //   comment: true,
    //   authorName: true,
    //   authorImageUrl: true,
    // },
  });
  // console.log("findExistingReview", review);
  // console.log("fetchProductReviews", reviews);
  revalidatePath(`/products/${productId}`);
  return reviews;
};

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser();

  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      // no need as we use different image as in product[id] for review as on page reviews
      // authorName: true,
      // authorImageUrl: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return reviews;
};

export const deleteReviewAction = async (productId: string) => {
  console.log(productId); //clerkId
  await db.review.delete({
    where: {
      id: productId,
    },
  });
  revalidatePath("/reviews");
  return { message: "deleted review" };
};

export const findExistingReview = async (productId: string, userId: string) => {
  try {
    const review = await db.review.findFirst({
      where: {
        productId,
        clerkId: userId,
      },
    });
    revalidatePath(`/products/${productId}`);
    return review;
  } catch (error) {
    renderError(error);
  }
};

export const fetchProductRating = async (productId: string) => {
  //agrregate return {} grodupBY []
  // [
  //   {
  //     _avg: { rating: 3.5 },
  //     _count: { rating: 2 },
  //     productId: '304f4d16-9574-4c36-a0f5-db8e94d6c081'
  //   }
  // ]
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });
  revalidatePath(`/products/${productId}`);
  return {
    rating: result[0]?._avg.rating?.toFixed(2) ?? 0,
    count: result[0]?._count.rating ?? 0,
  }; // return { message: "review exists" };
};
