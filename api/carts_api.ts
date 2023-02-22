import axios from "axios";

export async function getCartItems(userId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/carts/${userId}`,
    // "http://localhost:8080/carts/22",
  );
  return data;
}

export function fetchCartItems(data: any): Promise<any> {
  return axios.post(
    `http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/carts`,
    // `http://localhost:8080/carts`,
    data,
  );
}

export function deleteCartItem(data: any): Promise<any> {
  return axios.delete(
    `http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/carts`,
    // `http://localhost:8080/carts`,
    { data },
  );
}

export function modifyCartItem(data: any): Promise<any> {
  console.log("data", data);
  return axios.put(
    `http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/carts`,
    // `http://localhost:8080/carts`,
    // {
    //   Headers: {
    //     "User-Agent":
    //       "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    //   },
    // },
    data,
  );
}
