import axios from "axios";

export async function GetCategory(companyId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/category`,
    // `http://localhost:8080/${companyId}/category`,
  );

  return data;
}

export async function CreateCategory(
  companyId: any,
  categoryData: any,
): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const { data } = await axios.post(
    `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/category`,
    // `http://localhost:8080/${companyId}/category`,
    categoryData,
    { headers },
  );
  return data;
}
