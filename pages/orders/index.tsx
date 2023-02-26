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
  flexRender,
} from "@tanstack/react-table";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fuzzyFilter } from "../../components/tanstackTable/filter/fuzzyFilter";
import NavButton from "../../components/tanstackTable/pagiNav";
import { GetUser } from "../../api/user_api";
import { useGetOrdersByCompany } from "../../query/order";
import { ordersByCompanyList } from "../../components/tanstackTable/columns/ordersByCompanyList";
import { useGetUserWithOrders } from "../../query/users";

// 스타일 컴포넌트
const OrdersComtainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TopContainer = styled.div`
  flex: 0.05;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const MenuName = styled.div`
  color: white;
  margin-left: 30px;
  font-size: larger;
`;

const UserName = styled.div`
  color: white;
  margin-right: 30px;
  font-size: larger;
`;

const TableContainer = styled.div`
  padding: 30px;
  margin: 40px;
  border-radius: 20px;
  background-image: linear-gradient(45deg, #1b303d, #174052);
`;

const TopButtonContainer = styled.div`
  display: flex;
  border-bottom: 2px solid rgba(77, 130, 141, 0.5);
`;

const TopButton = styled.div`
  font-size: larger;
  font-weight: 700;
  color: ${(props: any): any => (props ? "white" : "#2c7580")};
  padding: 10px 10px;
`;

const SearchContainer = styled.div`
  width: 600px;
  border: 1px solid rgba(77, 130, 141, 0.5);
  border-radius: 20px;
  padding: 10px;
  margin: 15px 0px;
`;
const SearchInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  caret-color: white;
  color: white;
  ::placeholder {
    color: #e3eff2;
  }
`;

const Table = styled.table`
  width: 100%;
`;

const TableHeader = styled.tr`
  background-color: #243d4b;
  color: lightgray;
  font-size: larger;
`;

const TableHeaderCell = styled.th`
  padding: 10px 20px;
`;

const TableRow = styled.tr`
  border: 1px;
  background-color: transparent;
  color: #e3eff2;
  text-align: center;
`;

const TableCell = styled.td`
  padding: 10px 5px;
  border-bottom: 1px solid rgba(77, 130, 141, 0.2);
`;

const NavButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
`;

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SearchContainer>
      <SearchInput
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </SearchContainer>
  );
}

export default function Orders() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: user } = useQuery(["user"], () => GetUser(22));
  const { data: ordersData } = useGetOrdersByCompany(user?.companyId);
  // const { data: productData } = useGetUserWithOrders(user?.companyId);

  // 데이터 초기화
  const data = useMemo(() => ordersData || [], [ordersData]);
  const columns = useMemo<ColumnDef<any, any>[]>(() => ordersByCompanyList, []);

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
    <OrdersComtainer>
      <TopContainer>
        <MenuName>ORDERS</MenuName>
        <UserName>유저이름</UserName>
      </TopContainer>
      <TableContainer>
        <TopButtonContainer>
          <TopButton>전체</TopButton>
          <TopButton>유저별</TopButton>
          <TopButton>배송완료</TopButton>
        </TopButtonContainer>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value: any) => setGlobalFilter(String(value))}
          placeholder="Search all columns..."
        />
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableHeader key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHeaderCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? " <"}
                        </div>
                      )}
                    </TableHeaderCell>
                  );
                })}
              </TableHeader>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row: any) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell: any) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </tbody>
        </Table>
        <NavButtonContainer>
          <button
            type="button"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>

          <span>
            <strong>
              {table.getState().pagination.pageIndex + 1} page of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span>
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </span>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            type="button"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[30, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span> 총 : {table.getPrePaginationRowModel().rows.length} 개</span>
        </NavButtonContainer>
      </TableContainer>
    </OrdersComtainer>
  );
}
