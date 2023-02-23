import axios from "axios";

export async function GetShipping(companyId: any, userId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/${companyId}/shipping/${userId}`,
  );

  return data;
}

export async function GetShippingByCompany(companyId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/${companyId}/shipping`,
  );

  return data;
}
