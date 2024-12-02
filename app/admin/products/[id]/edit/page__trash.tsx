"use client";
import SubmitButton from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { fetchAdminProductDetails, updateProducImageAction } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import ImageInput from "@/components/form/ImageInput";

function EditProduct(props: { params: Promise<{ id: string }> }) {
  // const params = await props.params;
  const [singleProduct, setSingleProduct] = useState<Product>();
  //const product = await fetchAdminProductDetails(params.id);
  //  const { name, company, price, featured } = singleProduct;

  // const formatedPrice = formatCurrency(price);

  const [isHidden, setIsHidden] = useState(false);
  // console.log(product);
  useEffect(() => {
    async function getProduct() {
      const params = await props.params;
      const product = await fetchAdminProductDetails(params.id);
      setSingleProduct(product);
    }

    getProduct();
  }, []);

  console.log(singleProduct);
  return (
    // <div>Edit Product</div>
    // <FormContainer>
    <>
      <>
        <Image
          src={singleProduct?.image || ""}
          width={300}
          height={300}
          priority
          unoptimized
          alt={singleProduct?.image || ""}
        />
        <Button onClick={() => setIsHidden((prev) => !prev)} className="m-4">
          update image
        </Button>

        {isHidden && (
          <FormContainer action={updateProducImageAction}>
            <input name="id" type="hidden" value={singleProduct?.id} />
            <input name="url" type="hidden" value={singleProduct?.image} />
            <ImageInput />
          </FormContainer>
        )}
      </>
      <div className="flex gap-x-4 justify-between">
        <FormInput
          name={singleProduct?.name || ""}
          type="text"
          label="Product Name"
          defaultValue={singleProduct?.name}
        />
        <FormInput
          name={singleProduct?.company || ""}
          type="text"
          label="Company"
          defaultValue={singleProduct?.company}
        />
      </div>
      {/* <FormInput name={singleProduct.price} type="text" label="Price" defaultValue={formatedPrice} /> */}
      <div className="mt-6">
        <CheckboxInput name="featured" label="featured" defaultChecked={singleProduct?.featured} />
      </div>

      <SubmitButton className="mt-6" text="update Product" />
    </>
    // </FormContainer>
  );
}

export default EditProduct;
