import axios from "axios";
import Cookies from "js-cookie";

interface IRequest {
  url: string;
  body?: object;
}
interface IApi extends IRequest {
  type: string;
}

const apiRaw = axios.create({
  baseURL: "",
}) as any;

async function apiRequest({ type, url, body }: IApi) {
  const userToken = Cookies.get("user-token");
  apiRaw.headers.Authorization = !!userToken ? `Bearer ${userToken}` : "";

  try {
    let { data: _response } = await apiRaw[type](url, body);
    return _response;
  } catch (__error) {
    throw __error;
  }
}

export const api = {
  get: async (__request: IRequest) => {
    return apiRequest({
      ...__request,
      type: "get",
    });
  },
  post: async (__request: IRequest) => {
    return apiRequest({
      ...__request,
      type: "post",
    });
  },
  put: async (__request: IRequest) => {
    return apiRequest({
      ...__request,
      type: "put",
    });
  },
  delete: async (__request: IRequest) => {
    return apiRequest({
      ...__request,
      type: "delete",
    });
  },
};
