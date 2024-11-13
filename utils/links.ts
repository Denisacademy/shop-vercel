type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/products", label: "products" },
  { href: "/favorites", label: "favorites" },
  { href: "/cart", label: "cart" },
  { href: "/reviews", label: "reviews" },
  { href: "/orders", label: "orders" },
];
