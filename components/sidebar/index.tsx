import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { GetUser } from "../../api/user_api";

const SidebarContainer = styled.div`
  height: 100vh;
  display: flex;
  flex: 0.15;
  background-color: #fbfeff;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const TopContainer = styled.div`
  width: 100%;
`;
const BottomContainer = styled.div`
  width: 100%;
`;

const CompanyName = styled.div`
  width: 100%;
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
  const { data: user, isLoading } = useQuery(["user"], () => GetUser(22));

  return (
    <SidebarContainer>
      <TopContainer>
        {!isLoading && (
          <CompanyName>
            <Link href="/">{user.companyName}</Link>
          </CompanyName>
        )}

        {/* // TODO 로그인 후 처리 */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <MenuButton selected={router.asPath === "/"}>대시보드</MenuButton>
        </Link>
        <Link href="/orders" style={{ textDecoration: "none" }}>
          <MenuButton selected={router.asPath.includes("/orders/")}>
            주문
          </MenuButton>
        </Link>

        <Link href="/products" style={{ textDecoration: "none" }}>
          <MenuButton selected={router.asPath === "/products/"}>
            상품
          </MenuButton>
        </Link>

        <Link href="/shippings" style={{ textDecoration: "none" }}>
          <MenuButton selected={router.asPath === "/shippings/"}>
            배송
          </MenuButton>
        </Link>
        <Link href="/users" style={{ textDecoration: "none" }}>
          <MenuButton selected={router.asPath === "/users/"}>유저</MenuButton>
        </Link>
        {!isLoading && (
          <MenuButton>
            <a
              href={`${user.storeUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              STORE
            </a>
          </MenuButton>
        )}
      </TopContainer>

      <BottomContainer>
        <MenuButton style={{ fontSize: "14px" }}>로그아웃</MenuButton>
      </BottomContainer>
    </SidebarContainer>
  );
}
