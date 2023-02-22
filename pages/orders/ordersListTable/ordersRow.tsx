import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GetUser } from "../../../api/user_api";
import { useAddCart } from "../../../query/cartitems";

const TableRow = styled.tr`
  border: 1px;
  background-color: aliceblue;
`;
export default function OrdersRow({ row, flexRender }: any) {
  const [qty, setQty] = useState<any>("");
  const qtyHandler = (e: any) => {
    setQty(Number(e.target.value));
  };
  // TODO 성능개선 : 유저아이디랑 핸들 섬밋은 부모로부터?

  const { data: user } = useQuery(["user"], () => GetUser(22));

  const data = { usersId: user?.id, productId: row.original.id, qty };
  const { mutate: addCart } = useAddCart();

  const handleSubmit = () => {
    if (qty === "") {
      alert("올바를 숫자를 써줘");
      return;
    }
    addCart(data);
    setQty("");
  };
  return (
    <TableRow key={row.id}>
      {row.getVisibleCells().map((cell: any) => {
        return (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </TableRow>
  );
}
