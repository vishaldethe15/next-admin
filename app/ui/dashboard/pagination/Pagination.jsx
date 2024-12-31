"use client";
import styles from "./pagination.module.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Pagination = ({ count, itemPerPage }) => {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = searchParam.get("page") || 1;
  const params = new URLSearchParams(searchParam);
  const skip = itemPerPage * (parseInt(page) - 1);

  const hasPrev = skip > 0;
  const hasNext = skip + itemPerPage < count;

  const handleChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
