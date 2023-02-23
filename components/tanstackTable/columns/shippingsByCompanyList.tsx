import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const shippingsByCompanyList: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.userName,
    id: "userName",
    header: "이름",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.totalPrice,
    id: "totalPrice",
    header: "총액",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.shippingPrice,
    id: "shippingPrice",
    header: "배송비",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.itemsPrice,
    id: "itemsPrice",
    header: "상품가격",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.shippedAt,
    id: "shippedAt",
    header: "배송일",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];
