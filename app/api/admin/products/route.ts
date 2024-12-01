import { fetchAllProducts } from "@/utils/actions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const products = await fetchAllProducts({ search: "" });
  // console.log("PRODUCTS", products);
  // return NextResponse.json({ products });
  const data = await req.json();
  console.log("POST_DATA", data);
  return Response.json({ msg: "ADMIN_PRODUCTS", data: products });
};
