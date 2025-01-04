"use client";
import { toggleFavoriteAction } from "@/utils/actions";
import { CardSubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";

function FavoriteToggleForm({ favoriteId, productId }: { productId: string; favoriteId: string }) {
  // const toggleAction_ = toggleFavoriteAction.bind(null, {
  //   favoriteId,
  //   productId,
  // });

  // const toggleAction = toggleFavoriteAction
  // );
  const urlName = usePathname();
  return (
    <FormContainer action={toggleFavoriteAction}>
      <Input name="productId" defaultValue={productId} type="hidden" />
      <Input name="favoriteId" defaultValue={favoriteId} type="hidden" />
      <Input name="urlName" value={urlName} type="hidden" />
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}

export default FavoriteToggleForm;
