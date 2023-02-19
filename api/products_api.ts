import axios from "axios";

export async function GetProducts(): Promise<any> {
  const { data } = await axios(
    "http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/products",
  );

  return data;
}
