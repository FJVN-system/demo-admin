import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const HeaderContainer = styled.div`
  height: 30px;
  background-color: gray;
  padding: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
`;
const MenuButton = styled.div`
  background-color: red;
  margin: 0px 4px;
  padding: 3px 5px;
`;

export default function Header(): any {
  return (
    <HeaderContainer>
      <div>
        <Link href="/">회사이름</Link>
      </div>
      <RightContainer>
        {/* // TODO 로그인 후 처리 */}
        <MenuButton>Hi! 유저이름</MenuButton>
        <MenuButton>
          <Link href="/">MAIN</Link>
        </MenuButton>
        <MenuButton>
          <Link href="/orders">주문목록</Link>
        </MenuButton>
        <MenuButton>
          <Link href="/shippings">배송목록</Link>
        </MenuButton>
        <MenuButton>
          <Link href="/users">유저목록</Link>
        </MenuButton>
        <MenuButton>
          <Link href="/">STORE</Link>
        </MenuButton>
        <MenuButton>로그아웃</MenuButton>
      </RightContainer>
    </HeaderContainer>
  );
}
