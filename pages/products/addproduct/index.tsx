import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetUser } from "../../../api/user_api";
import { useCreateProduct } from "../../../query/product";

const AddProductContainer = styled.div``;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 40px;
  background-color: #0f3479;
  height: 100px;
`;
const TableContainer = styled.div`
  padding: 15px 20px;
  margin: -50px 40px 10px;
  border-radius: 10px;
  background-color: #fbfeff;
`;

const MenuName = styled.div`
  color: #fbfeff;
  margin-left: 60px;
  font-size: larger;
  font-weight: bold;
`;
const AddProductInputContainer = styled.div`
  display: flex;
  font-size: large;
  padding: 20px;
  align-items: center;
`;
const AddProductInputText = styled.div`
  width: 200px;
`;
const AddProductInput = styled.input``;
const AddProductSelect = styled.select``;
const AddProductOption = styled.option``;

const ProductButton = styled.button`
  background-color: #2a62ff;
  color: white;
  outline: none;
  border: none;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function AddProduct() {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: "",
    barcode: "",
    price: "",
    desc: "",
    purchase: "",
    deadline: "",
    release: "",
    sku: "",
    stock: "",
    thumb: "",
    weight: "",
  });

  const {
    title,
    barcode,
    price,
    desc,
    purchase,
    deadline,
    release,
    sku,
    stock,
    thumb,
    weight,
  } = inputs;

  const onChange = (e: any) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...inputs,
      [name]: value, // e.target의 name과 value이다.
    };

    setInputs(nextInputs);
  };
  const { data: user, isLoading } = useQuery(["user"], () => GetUser(22));
  const mutate = useCreateProduct(user?.companyId, inputs);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const con = window.confirm("추가 하시겠습니까?");
    if (con) {
      if (
        title.length < 1 ||
        barcode.length < 1 ||
        desc.length < 1 ||
        deadline.length < 1 ||
        release.length < 1 ||
        sku.length < 1 ||
        thumb.length < 1 ||
        stock.length < 1 ||
        price.length < 1 ||
        purchase.length < 1 ||
        weight.length < 1
      ) {
        alert("빈칸이 없어야함");
      } else {
        mutate.mutateAsync();
      }
    }
  };
  const onReset = () => {
    setInputs({
      title: "",
      barcode: "",
      price: "",
      desc: "",
      purchase: "",
      deadline: "",
      release: "",
      sku: "",
      stock: "",
      thumb: "",
      weight: "",
    });
  };

  useEffect(() => {
    if (mutate.data) {
      if (mutate.data.errorMessage) {
        alert(mutate.data.errorMessage);
      } else {
        // alert(`${mutate.data} 개의 상품이 저장되었습니다`);
      }
    }
    if (mutate.status === "success") {
      if (mutate.data.title) {
        alert(`${mutate.data.title}가 등록되었습니다`);
        onReset();
      }
    }
  }, [mutate.data]);
  console.log("input", inputs);
  console.log("mutate.isError", mutate.isError);
  console.log("mutate.isLoading", mutate.isLoading);
  console.log("mutate.data", mutate.data);
  console.log("mutate.status", mutate.status);

  return (
    <AddProductContainer>
      <TopContainer>
        <MenuName>상품 등록</MenuName>
      </TopContainer>
      <TableContainer>
        <form>
          <AddProductInputContainer>
            <AddProductInputText>제목</AddProductInputText>
            <AddProductInput
              name="title"
              placeholder="엘범 제목"
              onChange={onChange}
              value={title}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>바코드</AddProductInputText>
            <AddProductInput
              name="barcode"
              placeholder="바코드"
              onChange={onChange}
              value={barcode}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>설명</AddProductInputText>
            <AddProductInput
              name="desc"
              placeholder="엘범 설명"
              onChange={onChange}
              value={desc}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>판매 가격</AddProductInputText>
            <AddProductInput
              type="number"
              name="price"
              placeholder="판매 가격"
              onChange={onChange}
              value={price}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>매입 가격</AddProductInputText>
            <AddProductInput
              type="number"
              name="purchase"
              placeholder="매입가"
              onChange={onChange}
              value={purchase}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>주문마감일</AddProductInputText>
            <AddProductInput
              type="datetime-local"
              name="deadline"
              placeholder="주문마감일"
              onChange={onChange}
              value={deadline}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>출시일</AddProductInputText>
            <AddProductInput
              type="datetime-local"
              name="release"
              placeholder="출시일"
              onChange={onChange}
              value={release}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>SKU</AddProductInputText>
            <AddProductInput
              name="sku"
              placeholder="SKU"
              onChange={onChange}
              value={sku}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>재고</AddProductInputText>
            <AddProductInput
              type="number"
              name="stock"
              placeholder="재고"
              onChange={onChange}
              value={stock}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>무제한 재고</AddProductInputText>
            <AddProductInput type="checkbox" />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>썸네일 주소</AddProductInputText>
            <AddProductInput
              name="thumb"
              placeholder="썸네일 주소"
              onChange={onChange}
              value={thumb}
            />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>무게</AddProductInputText>
            <AddProductInput
              type="number"
              name="weight"
              placeholder="무게"
              onChange={onChange}
              value={weight}
            />
          </AddProductInputContainer>
          {/* TODO api get 요청 만든 후 작업 */}
          {/* <AddProductInputContainer>
            <AddProductInputText>가수</AddProductInputText>
            <AddProductSelect>
              <AddProductOption>BTS</AddProductOption>
              <AddProductOption>에이티즈</AddProductOption>
              <AddProductOption>마마무</AddProductOption>
            </AddProductSelect>
            <AddProductInput />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>카테고리</AddProductInputText>
            <AddProductSelect>
              <AddProductOption>음반</AddProductOption>
              <AddProductOption>굿즈</AddProductOption>
              <AddProductOption>기타</AddProductOption>
            </AddProductSelect>
            <AddProductInput />
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>엔터</AddProductInputText>
            <AddProductSelect>
              <AddProductOption>하이브</AddProductOption>
              <AddProductOption>SM</AddProductOption>
              <AddProductOption>기타</AddProductOption>
            </AddProductSelect>
            <AddProductInput />
          </AddProductInputContainer> */}
        </form>
        <ProductButton
          type="submit"
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          등록하기
        </ProductButton>
      </TableContainer>
    </AddProductContainer>
  );
}
