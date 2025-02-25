import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProductAction, fetchAdminProducts } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";

async function ProductAdmin() {
  const products = await fetchAdminProducts();

  return (
    <section>
      <Table>
        <TableCaption>Total Products: {products.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Product Name</TableHead>
            <TableHead className="font-bold">Company</TableHead>
            <TableHead className="font-bold">Price</TableHead>
            <TableHead className="font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const { name, company, price } = product;
            const totalPrice = formatCurrency(price);
            return (
              <TableRow key={product.id}>
                <TableCell>
                  <Link
                    className="underline text-muted-foreground tracking-wide"
                    href={`/products/${product.id}`}
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{totalPrice}</TableCell>
                {/* ACTIONS */}
                <TableCell className="flex items-center gap-x-4">
                  {/* EDIT */}
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                  {/* DELETE */}
                  <DeleteProduct productId={product.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

function DeleteProduct({ productId }: { productId: string }) {
  //                        ACTION SERVER
  const deleteProduct = deleteProductAction.bind(null, { productId });

  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default ProductAdmin;
