"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

function NavSearch() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
      setSearch(term);
    } else params.delete("search");

    replace(`/products?${params.toString()}`);
  }, 500);

  useEffect(() => {
    if (searchParams.get("search")) {
    } else {
      setSearch("");
    }
  }, [searchParams]);

  return (
    <Input
      type="search"
      placeholder="search product..."
      className="max-w-xs dark:bg-muted"
      onChange={(e) => handleSearch(e.target.value)}
      value={search}
      // defaultValue={searchParams.get("search")?.toString()}
    />
  );
}

export default NavSearch;
