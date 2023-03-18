import axios from "axios";

export async function GetShippingItems(shippingId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/shippingitems/${shippingId}`,
  );

  return data;
}
