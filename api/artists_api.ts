import axios from "axios";

export async function GetArtists(companyId: any): Promise<any> {
  const { data } = await axios(
    // `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/products`,
    `http://localhost:8080/${companyId}/artists`,
  );

  return data;
}

export async function CreateArtist(
  companyId: any,
  artistData: any,
): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const { data } = await axios.post(
    // `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/products`,
    `http://localhost:8080/${companyId}/artists`,
    artistData,
    { headers },
  );
  return data;
}
