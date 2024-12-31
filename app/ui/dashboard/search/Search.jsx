"use client";
import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import useDebounce from "@/app/hooks/useDebounce";

const Search = ({ placeholder }) => {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebounce((e) => {
    const searchQuery = e.target.value;
    const params = new URLSearchParams(searchParam);
    params.set("page", 1);
    searchQuery.length > 2
      ? params.set("query", searchQuery)
      : params.delete("query");
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
