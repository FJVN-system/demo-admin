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
import { useGetShippingsByCompany } from "../../query/shippings";
import { shippingsByCompanyList } from "../../components/tanstackTable/columns/shippingsByCompanyList";
import Search from "../../components/icons/Search";
import ArrowDown from "../../components/icons/ArrowDown";
import ArrowUp from "../../components/icons/ArrowUp";
import ShippingItems from "./shippingitem";

// 스타일 컴포넌트
const OrderItemListComtainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 40px;
  background-color: #0f3479;
  height: 100px;
`;

const MenuName = styled.div`
  color: #fbfeff;
  margin-left: 60px;
  font-size: larger;
  font-weight: bold;
`;

const UserName = styled.div`
  color: #fbfeff;
  font-weight: bold;
  margin-right: 60px;
  font-size: larger;
`;

const TableContainer = styled.div`
  padding: 15px 20px;
  margin: -50px 40px 10px;
  border-radius: 10px;
  background-color: #fbfeff;
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
  color: #1b3d7c;
  font-weight: bold;
`;

const NavButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const NavButton = styled.button`
  background-color: ${(props) => (props.disabled ? "gray" : "#152b7b")};
  color: ${(props) => (props.disabled ? "lightgray" : "white")};
  border: none;
  height: 26px;
  width: 30px;
  font-weight: bold;
`;

const NavText = styled.span`
  font-weight: bold;
  color: #1b3d7c;
  margin: 0px 5px;
`;
const NavInput = styled.input`
  border: 1px solid lightgray;
  height: 22px;
  width: 50px;
  text-align: center;
  font-size: medium;
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

const ShippingDetail = styled.button`
  border: none;
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 5px;
  background-color: #152b7b;
  color: #ffffff;
  cursor: pointer;
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

export default function Shippings() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: user, isLoading } = useQuery(["user"], () => GetUser(22));
  const { data: shippingsData } = useGetShippingsByCompany(user?.companyId);

  const [shippingDetaile, setShippingDetaile] = useState(false);
  const handlerShippingDetaile = () => {
    setShippingDetaile(!shippingDetaile);
  };
  // 데이터 초기화
  const data = useMemo(() => shippingsData || [], [shippingsData]);
  const columns = useMemo<ColumnDef<any, any>[]>(
    () => shippingsByCompanyList,
    [],
  );

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
    <OrderItemListComtainer>
      <TopContainer>
        <MenuName>배송현황</MenuName>
        {!isLoading && (
          <UserName>
            {user.companyName}-{user.userName}
          </UserName>
        )}{" "}
      </TopContainer>
      <TableContainer>
        {/* <TopButtonContainer>
          <TopButton dd>
            전체 {table.getPrePaginationRowModel().rows.length}
          </TopButton>
          <TopButton>ㅇ 2</TopButton>
          <TopButton>PHOTOBOOK 0</TopButton>
        </TopButtonContainer> */}
        <SearchContainerWrapper>
          <DebouncedInput
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
                <TableCell>
                  <ShippingDetail
                    type="button"
                    onClick={handlerShippingDetaile}
                  >
                    배송상품내용
                  </ShippingDetail>
                </TableCell>
                {shippingDetaile && <ShippingItems />}
              </TableRow>
            ))}
          </tbody>
        </Table>
        <NavButtonContainer>
          <NavButton
            type="button"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </NavButton>
          <NavButton
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </NavButton>
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
          <NavButton
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </NavButton>
          <NavButton
            type="button"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </NavButton>
        </NavButtonContainer>
      </TableContainer>
    </OrderItemListComtainer>
  );
}
