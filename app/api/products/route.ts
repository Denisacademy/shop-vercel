import { fetchFeaturedProducts } from "@/utils/actions";
// import {db} from '@/utils/db'

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const products = await fetchFeaturedProducts();
  // console.log("PRODUCTS", products);
  // return NextResponse.json({ products });
  return Response.json(products);
};
