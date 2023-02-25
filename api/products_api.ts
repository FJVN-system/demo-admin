import axios from "axios";

export async function GetProducts(companyId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-1286120377.ap-northeast-2.elb.amazonaws.com/${companyId}/products`,
  );

  return data;
}
