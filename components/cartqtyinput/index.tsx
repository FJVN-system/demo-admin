import styled from "@emotion/styled";
import { useState } from "react";

const CartQtyInputContainer = styled.form`
  display: flex;
`;

export default function CartQtyInput({ cell }: any) {
  const [cellValue, setCellValue] = useState(cell.getValue());
  const handleOccupation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCellValue(event.currentTarget.value);
  };
  console.log("cell", cell);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <CartQtyInputContainer onSubmit={(e: any) => handleSubmit(e)}>
      <input type="numbur" value={cellValue} onChange={handleOccupation} />
      <button type="submit">수정</button>
    </CartQtyInputContainer>
  );
}
