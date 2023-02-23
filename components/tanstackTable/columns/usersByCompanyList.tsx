import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const usersByCompanyList: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.userName,
    id: "userName",
    header: "이름",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.createdAt,
    id: "createdAt",
    header: "가입일",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];
