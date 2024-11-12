import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CartPage() {
  return (
    <>
      <nav className="py-4 flex justify-between">
        <p>shop</p>
        <input
          className="bg-white"
          type="text"
          placeholder="search product..."
        />
        <div className="flex items-center gap-4">
          <span>cart</span>
          <span>dark mode</span>
          <span>list</span>
        </div>
      </nav>
      <section className="pt-10 grid grid-cols-2 h-15">
        <div>
          <h2>We are changinf way people shop</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Blanditiis nesciunt at
            assumenda cumque voluptas odio modi doloremque
            qui tenetur iusto.
          </p>
        </div>
        <div>
          <Image
            width={544}
            height={321}
            src="/img1.jpeg"
            alt="img"
          />
        </div>
      </section>
      <section>
        <h2 className="font-bold text-xl">
          Featured Prducts
        </h2>
        <hr className="mt-4"></hr>
        <div className="grid grid-cols-3 pt-8 gap-5 items-center">
          <article className="relative">
            <Link href="/cart">
              <div>
                <Image
                  src={"/img2.jpeg"}
                  width={500}
                  height={500}
                  alt="pr"
                />
              </div>
            </Link>
            <div className="absolute top-4 right-4">
              <FavoriteToggleButton productId="1" />
            </div>
          </article>
          <article className="relative">
            <Link href="/cart">
              <div>
                <Image
                  src={"/img1.jpeg"}
                  width={500}
                  height={500}
                  alt="pr"
                />
              </div>
            </Link>
            <div className="absolute top-4 right-4">
              <FavoriteToggleButton productId="1" />
            </div>
          </article>
          <article className="relative">
            <Link href="/cart">
              <div>
                <Image
                  src={"/img4.jpeg"}
                  width={750}
                  height={500}
                  alt="pr"
                />
              </div>
            </Link>
            <div className="absolute top-4 right-4">
              <FavoriteToggleButton productId="1" />
            </div>
          </article>
        </div>
      </section>
      <section className="pt-10">
        <nav className="flex gap-3 mb-3">
          <ol className="flex gap-3">
            <li>
              <a href="/">Home</a>
            </li>
            <li>*</li>
            <li>
              <a href="/">Products</a>
            </li>
            <li>*</li>
            <li>
              <a href="/">Orange Leater Sofa Test</a>
            </li>
          </ol>
        </nav>
        <div className="grid grid-cols-2 items-center">
          <Image
            src="/img4.jpeg"
            width={300}
            height={300}
            className="object-cover"
            alt="sl"
          />
          <div>
            <div className="flex gap-5 items-center">
              <h2>Orange Leather Sofa</h2>
              <FavoriteToggleButton productId="1" />
            </div>
            <h2>Rodriguez Group</h2>
            <p className="py-4">$200</p>
            <p className="py-4">
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Porro, suscipit molestias?
              Facilis tempora amet velit nostrum consectetur
              nisi quod suscipit, nemo accusamus harum
              dolore doloribus, aspernatur ullam ratione
              voluptates possimus.
            </p>
            <p>Amount:</p>
            <select />
            <button className="px-4 rounded-sm block bg-blue-400 text-white">
              Add To Cart
            </button>
          </div>
        </div>
        <h1 className="text-bold ">Product Reviews</h1>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="border p-4 rounded-sm">
            <div className="flex gap-3">
              <Image
                src="/img1.jpeg"
                className="rounded-full"
                width={50}
                height={50}
                alt="user"
              />
              <div>
                <p>Thankgod</p>
                <p>* * * * *</p>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Veritatis, praesentium!
            </p>
            <p>Show more</p>
          </div>
          <div className="border p-4 rounded-sm">
            <div className="flex gap-3">
              <Image
                src="/img1.jpeg"
                className="rounded-full"
                width={50}
                height={50}
                alt="user"
              />
              <div>
                <p>Thankgod</p>
                <p>* * * * *</p>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Veritatis, praesentium!
            </p>
            <p>Show more</p>
          </div>
          <div className="border p-4 rounded-md">
            <div className="flex gap-3">
              <Image
                src="/img1.jpeg"
                className="rounded-full"
                width={50}
                height={50}
                alt="user"
              />
              <div>
                <p>Thankgod</p>
                <p>* * * * *</p>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Veritatis, praesentium!
            </p>
            <p>Show more</p>
          </div>
          <div className="border p-4 rounded-sm">
            <div className="flex gap-3">
              <Image
                src="/img1.jpeg"
                className="rounded-full"
                width={50}
                height={50}
                alt="user"
              />
              <div>
                <p>Thankgod</p>
                <p>* * * * *</p>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Veritatis, praesentium!
            </p>
            <p>Show more</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default CartPage;

// function Providers({children: {children: React.ReactNode}) {
//   return (
//     <>
//       <ThemeProvider attribute="class" defaultTheme="system" enableSystem
//         disableTransitionOnChange
//       >
//         {children}
//       </ThemeProvider>
//     </>
//   );
// }

// export default function RootLayout({children: Readonly<{ children: React.ReactNode}>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <Providers>
//           <Navbar />
//           <Container className="py-20">{children}</Container>
//         </Providers>
//       </body>
//     </html>
//   );
// }
