import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import FavoriteToggleForm from "./FavoriteToggleForm";
import { fetchFavoriteId, toggleFavoriteAction } from "@/utils/actions";
import { CardSignInButton, CardSubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";

async function FavoriteToggleButton({ productId }: { productId: string }) {
  // console.log("productId", productId);
  const { userId } = auth();
  // console.log("FavoriteToggleButton", userId);
  if (!userId) return <CardSignInButton />;

  const favoriteId = await fetchFavoriteId({ productId, userId });

  return (
    <FavoriteToggleForm productId={productId} favoriteId={favoriteId}>
      {/* <Button  onClick={() => console.log("productId", productId)}
        size="icon"        variant="outline"      className="p-2 cursor-pointer"      >
        <FaHeart />
      </Button> */}
    </FavoriteToggleForm>
  );
}

export default FavoriteToggleButton;

async function FavoriteToggleBtn({ productId }: { productId: string }) {
  const { userId } = auth();

  if (!userId) return <CardSignInButton />;

  const favoriteId = await fetchFavoriteId({ productId, userId });
  const action = toggleFavoriteAction;
  return (
    <FavoriteToggleForm favoriteId={"23"} productId={"22"}>
      {/* IMPORT */}
      <FormContainer action={action}>
        {/* SPECIFY SUBMIT BTN ICON */}
        <CardSubmitButton isFavorite={favoriteId ? true : false} />
      </FormContainer>
    </FavoriteToggleForm>
  );
}
