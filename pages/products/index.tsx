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
import { useGetProducts } from "../../query/product";
import { GetUser } from "../../api/user_api";
import { productsList } from "../../components/tanstackTable/columns/productsList";
import SearchSortTable from "../../components/tanstackTable/searchSortTable";

// 스타일 컴포넌트
const ProductListContainer = styled.div`
  flex: 0.7;
  background-color: gray;
  padding: 2px;
`;

export default function Products() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: user } = useQuery(["user"], () => GetUser(22));
  const { data: productData } = useGetProducts(user?.companyId);

  // 데이터 초기화
  const data = useMemo(() => productData || [], [productData]);
  const columns = useMemo<ColumnDef<any, any>[]>(() => productsList, []);

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
    initialState: { pagination: { pageSize: 30 } },
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
    <ProductListContainer>
      <DebouncedInput
        value={globalFilter ?? ""}
        onChange={(value: any) => setGlobalFilter(String(value))}
        placeholder="Search all columns..."
      />
      <SearchSortTable table={table} />
      <NavButton table={table} />
    </ProductListContainer>
  );
}
