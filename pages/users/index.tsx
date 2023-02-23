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

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DebouncedInput from "../../components/tanstackTable/debounceInput";
import { fuzzyFilter } from "../../components/tanstackTable/filter/fuzzyFilter";
import NavButton from "../../components/tanstackTable/pagiNav";
import { GetUser } from "../../api/user_api";
import SearchSortTable from "../../components/tanstackTable/searchSortTable";
import { useGetShippingsByCompany } from "../../query/shippings";
import { shippingsByCompanyList } from "../../components/tanstackTable/columns/shippingsByCompanyList";
import { useGetUsersByCompanyId } from "../../query/users";
import { usersByCompanyList } from "../../components/tanstackTable/columns/usersByCompanyList";

// 스타일 컴포넌트
const OrderItemListComtainer = styled.div`
  flex: 0.7;
  background-color: gray;
  padding: 2px;
`;

export default function Users() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: user } = useQuery(["user"], () => GetUser(22));
  const { data: usersData } = useGetUsersByCompanyId(user?.companyId);

  // 데이터 초기화
  const data = useMemo(() => usersData || [], [usersData]);
  const columns = useMemo<ColumnDef<any, any>[]>(() => usersByCompanyList, []);

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
  return (
    <OrderItemListComtainer>
      <DebouncedInput
        value={globalFilter ?? ""}
        onChange={(value: any) => setGlobalFilter(String(value))}
        placeholder="Search all columns..."
      />
      <SearchSortTable table={table} />
      <NavButton table={table} />
    </OrderItemListComtainer>
  );
}
