import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const productsList: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.category,
    id: "category",
    header: "카테고리",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.barcode,
    id: "barcode",
    header: "바코드",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.sku,
    id: "sku",
    header: "SKU",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.artist,
    id: "artist",
    header: "가수",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.title,
    id: "title",
    header: "제목",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.purchasePrice,
    id: "purchasePrice",
    header: "매입가",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.price,
    id: "price",
    header: "판매가",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.stock,
    id: "stock",
    header: "재고",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.releaseDate,
    id: "releaseDate",
    header: "출시일",
    cell: (info) => info.getValue()?.substr(0, 10),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.preorderDeadline,
    id: "preorderDeadline",
    header: "마감일",
    cell: (info) => info.getValue()?.substr(0, 10),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];
