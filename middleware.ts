import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
//cart/reviews/favorites/orders
export default clerkMiddleware((auth, request) => {
  //not auth -> null auth id='23232dd'
  const isAdminUser = auth().userId === process.env.ADMIN_USER_ID;
  //if you request admin page and user not admin
  //              true      &&     !false
  if (isAdminRoute(request) && !isAdminUser) {
    console.log("NO_ADMIN", request.url, isAdminUser);
    return NextResponse.redirect(new URL("/", request.url));
  }
  // console.log("isAdminUser", request.nextUrl.searchParams.get("admin"));

  //isPublicRoute(cart) -> false -> if(!false) -> login
  if (!isPublicRoute(request)) {
    //if you not signin and try not public pages  -> cart, favorites, reviews, orders)
    //redire to login
    console.log("notPublicPage");
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
