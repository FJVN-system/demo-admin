import axios from "axios";

export async function GetEnt(companyId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/ent`,
    // `http://localhost:8080/${companyId}/artists`,
  );

  return data;
}

export async function CreateEnt(companyId: any, entData: any): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const { data } = await axios.post(
    `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/ent`,
    // `http://localhost:8080/${companyId}/artists`,
    entData,
    { headers },
  );
  return data;
}
