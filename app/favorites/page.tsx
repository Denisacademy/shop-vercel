import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { getFavoriteUsersProduct, getUserFavoriteProducts } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";

async function FavoritesPage() {
  const favorites = await getUserFavoriteProducts();
  // const user = auth();
  // const favoritesUsers = await getFavoriteUsersProduct();
  // console.log(favorites);
  // console.log(user);
  // const {
  //   clerkId,
  //   product: { name, featured, price },
  // } = favorites[0];
  // console.log("FavoritesPage", { clerkId, product: { name, featured, price } });
  return (
    <>
      <SectionTitle text="Favorites" />
      {!favorites.length && <h2 className="mt-2 text-2xl">Nothing to display</h2>}

      <ProductsGrid products={favorites.map((favorite) => favorite.product)} />
    </>
  );
}

export default FavoritesPage;
