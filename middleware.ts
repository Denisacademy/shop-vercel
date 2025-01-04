import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
// const isAdminRoute = createRouteMatcher(["/api/admin(.*)"]);

export default clerkMiddleware((auth, request) => {
  // const queryAdmin = request.nextUrl.searchParams.get("admin");
  const isAdminUser = auth().userId === process.env.ADMIN_USER_ID;
  //const apiAdminKey = process.env.ADMIN_USER_ID === queryAdmin;

  // console.log("clerkMiddleware", request.body);
  // if (apiAdminKey) {
  //   console.log("apiAdminKey", "allProducts");
  //   return NextResponse.next();
  // }
  //              true      &&     true
  if (isAdminRoute(request) && !isAdminUser) {
    console.log("NO_ADMIN", request.url, isAdminUser);
    return NextResponse.redirect(new URL("/", request.url));
  }
  // console.log("isAdminUser", request.nextUrl.searchParams.get("admin"));
  // console.log("1");
  if (!isPublicRoute(request)) {
    console.log("ADMIN", request.url);
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

//next.config, middleware,
//api/admin/products,
//prisma schema.prisma, [Cart, Product]
//utils db, supabase-bucket[Uplaod_Image], actions, schemas

//useSearchParams, useRouter{replace}, new URLSearchParams
//searchParams : { layout? : string; search? : string }

//TODO: function DeleteProduct({ productId }: { productId: string }) {
//const deleteProduct = deleteProductAction.bind(null, { productId });

//TODO: const IconButton = ({ actionType }: { actionType: actionType }) => {
//const { pending } = useFormStatus();

//clerk, toast, zod, suspense, 'use-client' -> error/loading
//products[id] params: {id: string}
//revalidatePath("/admin/products");

//useFormState(initState, action) form
//{pending} = useFormStatus button

//supabase uploadImage/create and deleteImage/delete

//one to one @unique
/*
one to many User posts  Post[] 

Post 
  id @default @id(uui())
  title
  user String User @relation(fileds:userId, references[id])
  userId 
*/
