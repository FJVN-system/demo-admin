import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const SidebarContainer = styled.div`
  height: 100vh;
  display: flex;
  flex: 0.15;
  /* background-color: #1c2c39; */
  /* background-color: #ebebeb; */
  background-color: #fbfeff;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  /* border-right: 1px solid rgba(60, 80, 80, 0.5); */
`;

const TopContainer = styled.div`
  width: 100%;
`;
const BottomContainer = styled.div`
  width: 100%;
`;

const CompanyName = styled.div`
  width: 100%;
  /* color: white; */
  color: #2a62ff;
  font-size: 23px;
  text-align: center;
  margin: 30px auto;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const MenuButton = styled.div<any>`
  width: 100%;
  border-left: ${(props) =>
    props.selected ? "3px #2A62FF solid" : "3px transparent"};
  padding: 20px 0px 20px 40px;
  color: ${(props) => (props.selected ? "#2A62FF" : "#a4a4a4")};
  font-size: larger;
  background-color: ${(props) => (props.selected ? "#eff6fd" : "")};
  margin: 20px 0px 20px 40px;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function Sidebar(): any {
  const router = useRouter();

  return (
    <SidebarContainer>
      <TopContainer>
        <CompanyName>
          <Link href="/">회사이름</Link>
        </CompanyName>
        {/* // TODO 로그인 후 처리 */}
        <MenuButton selected={router.asPath === "/"}>
          <Link href="/">대시보드</Link>
        </MenuButton>
        <MenuButton selected={router.asPath === "/orders/"}>
          <Link href="/orders">주문</Link>
        </MenuButton>
        <MenuButton selected={router.asPath === "/products/"}>
          <Link href="/products">상품</Link>
        </MenuButton>
        <MenuButton selected={router.asPath === "/shippings/"}>
          <Link href="/shippings">배송</Link>
        </MenuButton>
        <MenuButton selected={router.asPath === "/users/"}>
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
        <MenuButton style={{ fontSize: "14px" }}>로그아웃</MenuButton>
      </BottomContainer>
    </SidebarContainer>
  );
}
