import axios from "axios";

export async function GetCredit(companyId: any, userId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/credit/${userId}`,
  );

  return data;
}
