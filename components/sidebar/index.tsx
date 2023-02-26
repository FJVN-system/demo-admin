import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const SidebarContainer = styled.div`
  height: 100vh;
  display: flex;
  flex: 0.15;
  background-color: #1c2c39;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-right: 1px solid rgba(60, 80, 80, 0.5);
`;

const TopContainer = styled.div`
  width: 100%;
`;
const BottomContainer = styled.div`
  width: 100%;
`;

const CompanyName = styled.div`
  width: 100%;
  color: white;
  font-size: larger;
  text-align: center;
  margin: 30px auto;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const MenuButton = styled.div`
  width: 100%;
  color: gray;
  font-size: larger;
  margin: 20px 0px 20px 30px;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function Sidebar(): any {
  return (
    <SidebarContainer>
      <TopContainer>
        <CompanyName>
          <Link href="/">회사이름</Link>
        </CompanyName>
        {/* // TODO 로그인 후 처리 */}
        <MenuButton>
          <Link href="/">MAIN</Link>
        </MenuButton>
        <MenuButton>
          <Link href="/orders">주문</Link>
        </MenuButton>
        <MenuButton>
          <Link href="/products">상품</Link>
        </MenuButton>
        <MenuButton>
          <Link href="/shippings">배송</Link>
        </MenuButton>
        <MenuButton>
          <Link href="/users">유저</Link>
        </MenuButton>
        <MenuButton>
          <a
            href="http://fjvn-free-store.s3-website.ap-northeast-2.amazonaws.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            STORE
          </a>
        </MenuButton>
      </TopContainer>

      <BottomContainer>
        <MenuButton>로그아웃</MenuButton>
      </BottomContainer>
    </SidebarContainer>
  );
}
