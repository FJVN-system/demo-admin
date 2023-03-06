import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { GetShippingItems } from "../../../api/shippingitems_api";

const ShippingItemsContainer = styled.div`
  height: 200px;
  background-color: brown;
  flex: 0.3;
`;

export default function ShippingItems() {
  // TODO 로그인 후 처리
  const {
    data: shippingItemsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shippingitems"],
    queryFn: async () => {
      const data = await GetShippingItems(33);
      return data;
    },
  });

  // 컬럼 선언 및 설정
  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        accessorFn: (row) => row.shippingId,
        id: "shippingId",
        header: "주문번호",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.productName,
        id: "productName",
        header: "상품이름",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.qty,
        id: "qty",
        header: "수량",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.price,
        id: "price",
        header: "가격",
        cell: (info) => info.getValue(),
      },
    ],
    [],
  );

  // 데이터 초기화
  const data = useMemo(() => shippingItemsData || [], [shippingItemsData]);
  // @ts-ignore
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <ShippingItemsContainer>
      {isLoading && "로딩중"}
      {isError && "에러"}
      {shippingItemsData && (
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </ShippingItemsContainer>
  );
}
