import styled from "@emotion/styled";
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DebouncedInput from "../../../components/tanstackTable/debounceInput";
import { fuzzyFilter } from "../../../components/tanstackTable/filter/fuzzyFilter";
import { ordersListColumns } from "../../../components/tanstackTable/columns/ordersListColumns";
import NavButton from "../../../components/tanstackTable/pagiNav";
import { GetUser } from "../../../api/user_api";
import { useGetUserWithOrders } from "../../../query/users";
import OrdersListTable from "../ordersListTable";

// 스타일 컴포넌트
const OrdersListContainer = styled.div`
  flex: 0.7;
  background-color: gray;
  padding: 2px;
`;

export default function OrdersList() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: user } = useQuery(["user"], () => GetUser(22));
  const { data: usersWithOrdersData } = useGetUserWithOrders(user?.companyId);
  console.log("usersWithOrdersData", usersWithOrdersData);
  // 데이터 초기화
  const data = useMemo(() => usersWithOrdersData || [], [usersWithOrdersData]);
  const columns = useMemo<ColumnDef<any, any>[]>(() => ordersListColumns, []);

  // 테이블 훅
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "createdAt") {
      if (table.getState().sorting[0]?.id !== "createdAt") {
        table.setSorting([{ id: "createdAt", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <OrdersListContainer>
      <DebouncedInput
        value={globalFilter ?? ""}
        onChange={(value: any) => setGlobalFilter(String(value))}
        placeholder="Search all columns..."
      />
      <OrdersListTable table={table} />
      <NavButton table={table} />
    </OrdersListContainer>
  );
}
