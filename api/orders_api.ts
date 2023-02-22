import axios from "axios";

export async function GetOrders(companyId: any, userId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/${companyId}/ordersitem/${userId}`,
  );
  return data;
}

export function fetchOrder(userId: any): Promise<any> {
  return axios.post(
    `http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/ordersitem/${userId}`,
    // `http://localhost:8080/carts`,
  );
}
