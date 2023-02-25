import axios from "axios";

export async function GetShippingItems(shippingId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-1286120377.ap-northeast-2.elb.amazonaws.com/shippingitems/${shippingId}`,
  );

  return data;
}
