import axios from "axios";

export async function GetProducts(companyId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/products`,
    // `http://localhost:8080/${companyId}/products`,
  );

  return data;
}

export async function CreateBulkProduct(
  companyId: any,
  productsdata: any,
): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const { data } = await axios.post(
    `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/products/bulk`,
    // `http://localhost:8080/${companyId}/products/bulk`,
    JSON.stringify(productsdata),
    { headers },
  );
  return data;
}

export async function CreateProduct(
  companyId: any,
  productdata: any,
): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const { data } = await axios.post(
    `http://http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/products`,
    // `http://localhost:8080/${companyId}/products`,
    JSON.stringify(productdata),
    { headers },
  );
  return data;
}
