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
import { GetUser } from "../../api/user_api";
import { useGetOrdersByCompany } from "../../query/order";
import { ordersByCompanyList } from "../../components/tanstackTable/columns/ordersByCompanyList";
import { useGetUserWithOrders } from "../../query/users";
import ArrowUp from "../../components/icons/ArrowUp";
import Search from "../../components/icons/Search";
import ArrowDown from "../../components/icons/ArrowDown";

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
  color: #0f3479;
  margin-left: 60px;
  font-size: larger;
  font-weight: bold;
`;

const UserName = styled.div`
  color: #0f3479;
  font-weight: bold;
  margin-right: 60px;
  font-size: larger;
`;

const TableContainer = styled.div`
  padding: 30px;
  margin: 20px 40px;
  border-radius: 20px;
  background-color: #fbfeff;
  /* background-image: linear-gradient(135deg, #1b303d, #284b5a); */
`;

const TopButtonContainer = styled.div`
  display: flex;
  border-bottom: 2px solid rgba(77, 130, 141, 0.2);
  /* justify-content: space-between;
  align-items: flex-start; */
`;

const TopButton = styled.div<any>`
  font-size: larger;
  font-weight: 700;
  color: ${(props: any): any => (props.dd ? "#2a62ff" : "gray")};
  padding: 5px 10px 15px;
  margin-bottom: -2px;
  border-bottom: 2px
    ${(props: any): any => (props.dd ? "#2a62ff" : "transparent")} solid;
`;

const SearchContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchContainer = styled.div`
  width: 600px;
  border: 1px solid #1b3d7c;
  border-radius: 20px;
  padding: 10px;
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;

  > svg {
    color: #1b3d7c;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  caret-color: white;
  color: white;
  ::placeholder {
    color: rgb(161, 161, 161);
  }
`;

const TotalPerPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  color: #999bac;
  font-weight: bold;
`;

const PerPage = styled.select`
  height: 25px;
  margin: 0px 5px;
  font-size: 18px;
  border-radius: 5px;
  border-color: rgba(77, 130, 141, 0.7);
  background-color: transparent;
  color: #1b3d7c;
  outline: none;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
`;

const TableHeader = styled.tr`
  background-color: #f4f7f9;
  color: #999bac;
  font-size: 18px;
`;

const TableHeaderCellWrapper = styled.th`
  padding: 10px 20px;
`;

const TableHeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TableRow = styled.tr`
  border: 1px;
  background-color: transparent;
  text-align: center;
`;

const TableCell = styled.td<any>`
  padding: 5px 5px;
  border-bottom: 1px solid rgba(77, 130, 141, 0.2);
  color: ${(props: any) =>
    props.cell.column.id === "qty" ? "#30acc0" : "#1b3d7c"};
  font-weight: ${(props: any) =>
    props.cell.column.id === "qty" ? "bold" : "bold"};
  font-size: ${(props: any) =>
    props.cell.column.id === "qty" ? "18px" : "15px"};
`;

const NavButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
`;

const NavButton1 = styled.button`
  background-color: ${(props) => (props.disabled ? "#2a62ff" : "gray")};
  color: ${(props) => (props.disabled ? "white" : "lightgray")};
  border: none;
  border-radius: 10px 0px 0px 10px;
  height: 22px;
  font-weight: bold;
`;
const NavButton2 = styled.button`
  background-color: ${(props) => (props.disabled ? "#2a62ff" : "gray")};
  color: ${(props) => (props.disabled ? "white" : "lightgray")};
  border: none;
  height: 22px;
  font-weight: bold;
`;
const NavText = styled.span`
  font-weight: bold;
  color: #1b3d7c;
  margin: 0px 5px;
`;
const NavInput = styled.input`
  border: 1px solid rgba(77, 130, 141, 0.5);
  /* outline: none; */
  height: 22px;
  width: 50px;
  border-radius: 5px;
  margin-right: 5px;
  text-align: center;
  font-size: medium;
  border-color: rgba(77, 130, 141, 0.7);
  background-color: transparent;
  color: #1b3d7c;
  outline: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const NavButton3 = styled.button`
  background-color: ${(props) => (props.disabled ? "gray" : "#2c7580")};
  color: ${(props) => (props.disabled ? "lightgray" : "white")};
  border: none;
  height: 22px;
  font-weight: bold;
`;
const NavButton4 = styled.button`
  background-color: ${(props) => (props.disabled ? "gray" : "#2c7580")};
  color: ${(props) => (props.disabled ? "lightgray" : "white")};
  border: none;
  height: 22px;
  border-radius: 0px 10px 10px 0px;
  font-weight: bold;
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
      <Search />
    </SearchContainer>
  );
}

export default function Orders() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: user } = useQuery(["user"], () => GetUser(22));
  const { data: ordersData } = useGetOrdersByCompany(user?.companyId);
  const { data: productData } = useGetUserWithOrders(user?.companyId);

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
          <TopButton dd>
            전체 {table.getPrePaginationRowModel().rows.length}
          </TopButton>
          <TopButton>유저별 {productData && productData?.length}</TopButton>
          <TopButton>배송완료 0</TopButton>
        </TopButtonContainer>
        <SearchContainerWrapper>
          <DebouncedInput
            justify-contenspace-betweent
            value={globalFilter ?? ""}
            onChange={(value: any) => setGlobalFilter(String(value))}
            placeholder="Search all columns..."
          />
          <TotalPerPageContainer>
            <span>
              {" "}
              Total : {table.getPrePaginationRowModel().rows.length} 개 / 페이지
              당{" "}
            </span>
            <PerPage
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
            </PerPage>
            개
          </TotalPerPageContainer>
        </SearchContainerWrapper>

        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableHeader key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHeaderCellWrapper
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <TableHeaderCell
                          {...{
                            // className: header.column.getCanSort()
                            //   ? "cursor-pointer select-none"
                            //   : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          <div style={{ marginRight: "10px" }}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </div>
                          {{
                            asc: <ArrowDown />,
                            desc: <ArrowUp />,
                          }[header.column.getIsSorted() as string] ?? (
                            <ArrowDown />
                          )}
                        </TableHeaderCell>
                      )}
                    </TableHeaderCellWrapper>
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
                    <TableCell key={cell.id} cell={cell}>
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
          <NavButton1
            type="button"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </NavButton1>
          <NavButton2
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </NavButton2>
          <NavText>
            {table.getState().pagination.pageIndex + 1} page of{" "}
            {table.getPageCount()}
          </NavText>
          <span>
            <NavInput
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </span>
          <NavButton3
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </NavButton3>
          <NavButton4
            type="button"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </NavButton4>
        </NavButtonContainer>
      </TableContainer>
    </OrdersComtainer>
  );
}
