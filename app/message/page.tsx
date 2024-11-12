"use client";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json());

function CartPage() {
  const { data, error, isLoading } = useSWR(
    "/api/message",
    fetcher
  );

  // const getMessage = async () => {
  //   const data = await fetch("/api/message", {
  //     headers: {
  //       Accept: "application/json",
  //       method: "GET",
  //     },
  //   });
  //   const response = await data.json();
  //   console.log(response);
  // };

  console.log("SWR-CLIENT", data);
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      CartPage
      {/* <Button onClick={getMessage}>click fetch</Button> */}
    </div>
  );
}
export default CartPage;
