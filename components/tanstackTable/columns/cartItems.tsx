import { ColumnDef } from "@tanstack/react-table";

export const cartItemsColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.id,
    id: "id",
    header: "주문번호",
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.productTitle,
    id: "productTitle",
    header: "productTitle",
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.qty,
    id: "qty",
    header: "qty",
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.price,
    id: "price",
    header: "price",
    cell: (info) => info.getValue(),
  },
];
