import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetUser } from "../../../api/user_api";
import { useCreateArtist, useGetArtists } from "../../../query/artist";
import { useCreateCategory, useGetCategory } from "../../../query/category";
import { useCreateEnt, useGetEnt } from "../../../query/ent";
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

const AddButton = styled.button`
  background-color: #2a62ff;
  color: white;
  outline: none;
  border: none;
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 10px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit;
  }
`;
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
    artist: "",
    category: "",
    ent: "",
    addArtist: "",
    addCategory: "",
    addEnt: "",
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
    artist,
    category,
    ent,
    addArtist,
    addCategory,
    addEnt,
  } = inputs;

  const onChange = (e: any) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...inputs,
      [name]: value,
    };

    setInputs(nextInputs);
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
      artist: "",
      category: "",
      ent: "",
      addArtist: "",
      addCategory: "",
      addEnt: "",
    });
  };
  const { data: user, isLoading } = useQuery(["user"], () => GetUser(22));
  const {
    data: artistData,
    isLoading: isArtistLoading,
    isSuccess: isArtistSuccess,
  } = useGetArtists(user?.companyId);
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isSuccess: isCategorySuccess,
  } = useGetCategory(user?.companyId);
  const {
    data: entData,
    isLoading: isEntLoading,
    isSuccess: isEntSuccess,
  } = useGetEnt(user?.companyId);

  const productMutate = useCreateProduct(user?.companyId, inputs);
  const artistMutate = useCreateArtist(user?.companyId, {
    artistName: addArtist,
    companyId: user?.companyId,
  });
  const categoryMutate = useCreateCategory(user?.companyId, {
    categoryName: addCategory,
    companyId: user?.companyId,
  });
  const entMutate = useCreateEnt(user?.companyId, {
    entName: addEnt,
    companyId: user?.companyId,
  });

  const handleAddOnSubmit = (e: any) => {
    e.preventDefault();
    const con = window.confirm("추가 하시겠습니까?");
    if (con) {
      if (e.target.name === "addArtist") {
        if (addArtist.length < 1) {
          alert("추가할 가수의 이름을 작성해 주세요.");
        } else {
          artistMutate.mutateAsync();
          onReset();
        }
      } else if (e.target.name === "addCategory") {
        if (addCategory.length < 1) {
          alert("추가할 카테고리 이름을 작성해 주세요.");
        } else {
          categoryMutate.mutateAsync();
          onReset();
        }
      } else if (e.target.name === "addEnt") {
        if (addEnt.length < 1) {
          alert("추가할 소속사 이름을 작성해 주세요.");
        } else {
          entMutate.mutateAsync();
          onReset();
        }
      }
    }
  };
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
        weight.length < 1 ||
        artist.length < 1 ||
        category.length < 1 ||
        ent.length < 1
      ) {
        alert("빈칸이 없어야함");
      } else {
        productMutate.mutateAsync();
      }
    }
  };

  useEffect(() => {
    if (productMutate.data) {
      if (productMutate.data.errorMessage) {
        alert(productMutate.data.errorMessage);
      } else {
        // alert(`${productMutate.data} 개의 상품이 저장되었습니다`);
      }
    }
    if (productMutate.status === "success") {
      if (productMutate.data.title) {
        alert(`${productMutate.data.title}가 등록되었습니다`);
        onReset();
      }
    }
  }, [productMutate.data]);
  console.log("input", inputs);
  console.log("productMutate.isError", productMutate.isError);
  console.log("productMutate.isLoading", productMutate.isLoading);
  console.log("productMutate.data", productMutate.data);
  console.log("productMutate.status", productMutate.status);

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
          <AddProductInputContainer>
            <AddProductInputText>가수</AddProductInputText>
            <AddProductSelect name="artist" onChange={onChange} value={artist}>
              <AddProductOption value="">필수선택</AddProductOption>
              {!isArtistLoading &&
                isArtistSuccess &&
                artistData?.map((artistLi: any) => {
                  return (
                    <AddProductOption key={artistLi.id} value={artistLi.id}>
                      {artistLi.artistName}
                    </AddProductOption>
                  );
                })}
            </AddProductSelect>
            <AddProductInput
              placeholder="가수 추가"
              style={{ marginLeft: "50px" }}
              name="addArtist"
              onChange={onChange}
              value={addArtist}
            />
            <AddButton
              name="addArtist"
              type="button"
              onClick={(e) => handleAddOnSubmit(e)}
            >
              추가하기
            </AddButton>
          </AddProductInputContainer>

          <AddProductInputContainer>
            <AddProductInputText>카테고리</AddProductInputText>
            <AddProductSelect
              name="category"
              onChange={onChange}
              value={category}
            >
              <AddProductOption value="">필수선택</AddProductOption>
              {!isCategoryLoading &&
                isCategorySuccess &&
                categoryData?.map((categoryLi: any) => {
                  return (
                    <AddProductOption key={categoryLi.id} value={categoryLi.id}>
                      {categoryLi.categoryName}
                    </AddProductOption>
                  );
                })}
            </AddProductSelect>
            <AddProductInput
              placeholder="카테고리 추가"
              style={{ marginLeft: "50px" }}
              name="addCategory"
              onChange={onChange}
              value={addCategory}
            />
            <AddButton
              name="addCategory"
              type="button"
              onClick={(e) => handleAddOnSubmit(e)}
            >
              추가하기
            </AddButton>
          </AddProductInputContainer>
          <AddProductInputContainer>
            <AddProductInputText>엔터</AddProductInputText>
            <AddProductSelect name="ent" onChange={onChange} value={ent}>
              <AddProductOption value="">필수선택</AddProductOption>
              {!isEntLoading &&
                isEntSuccess &&
                entData?.map((entLi: any) => {
                  return (
                    <AddProductOption key={entLi.id} value={entLi.id}>
                      {entLi.entName}
                    </AddProductOption>
                  );
                })}
            </AddProductSelect>
            <AddProductInput
              placeholder="소속사 추가"
              style={{ marginLeft: "50px" }}
              name="addEnt"
              onChange={onChange}
              value={addEnt}
            />
            <AddButton
              name="addEnt"
              type="button"
              onClick={(e) => handleAddOnSubmit(e)}
            >
              추가하기
            </AddButton>
          </AddProductInputContainer>
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
