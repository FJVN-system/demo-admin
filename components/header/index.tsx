import styled from "@emotion/styled";
import React from "react";

const HeaderContainer = styled.div`
  height: 30px;
  background-color: gray;
  padding: 2px;
`;

export default function Header(): any {
  return <HeaderContainer>헤더</HeaderContainer>;
}
