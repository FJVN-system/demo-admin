import styled from "@emotion/styled";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import CartQtyInput from "../cartqtyinput";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns: ColumnDef<Person, any>[] = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("progress", {
    id: "progress",
    header: "Profile Progress",
    footer: (info) => info.column.id,
  }),
];

const CartContainer = styled.div`
  height: 200px;
  background-color: brown;
  flex: 0.3;
`;

export async function getStaticProps() {
  //   const queryClient = new QueryClient();
  //   try {
  //     await Promise.all([queryClient.prefetchQuery(["products"], GetProducts)]);
  //     return {
  //       props: {
  //         dehydratedState: dehydrate(queryClient),
  //       },
  //     };
  //   } catch (e) {
  //     console.log("index 페이지 try 에러", e);
  //     return {
  //       notFound: true,
  //     };
  //   } finally {
  //     queryClient.clear();
  //   }
}

export default function Cart() {
  const [data, setData] = useState(() => [...defaultData]);

  // @ts-ignore
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <CartContainer>
      장바구니
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
              {row.getVisibleCells().map((cell) =>
                cell.column.id === "progress" ? (
                  <td key={cell.id}>
                    <CartQtyInput cell={cell} />
                  </td>
                ) : (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button type="button">주문하기</button>
      </div>
    </CartContainer>
  );
}
