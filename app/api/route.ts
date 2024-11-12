import db from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return NextResponse.json(products);
};
