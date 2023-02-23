import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const ordersByCompanyList: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.userName,
    id: "userName",
    header: "이름",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.productTitle,
    id: "productTitle",
    header: "타이틀",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.price,
    id: "price",
    header: "가격",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.qty,
    id: "qty",
    header: "수량",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.createdAt,
    id: "createdAt",
    header: "주문일",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];
