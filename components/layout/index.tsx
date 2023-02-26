import styled from "@emotion/styled";
import React from "react";
import Sidebar from "../sidebar";

const LayoutContainer = styled.div`
  display: flex;
  flex: 1;
`;

const LeftContainer = styled.div`
  flex: 0.15;
`;

const RightContainer = styled.div`
  flex: 0.85;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(45deg, #122b35, #0c3740);
`;

export default function Layout({ children }: any) {
  return (
    <LayoutContainer>
      <LeftContainer>
        <Sidebar />
      </LeftContainer>
      <RightContainer>{children}</RightContainer>
    </LayoutContainer>
  );
}
