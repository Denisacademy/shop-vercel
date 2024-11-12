import ProductsContainer from "@/components/products/ProductsContainer";

async function ProductsPage(props: { searchParams: Promise<{ layout?: string; search?: string }> }) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const layout = searchParams?.layout || "grid";

  //http://localhost:3000/products?query=simba&page=3

  return (
    <>
      <ProductsContainer layout={layout} search={search} />
    </>
  );
}

export default ProductsPage;
