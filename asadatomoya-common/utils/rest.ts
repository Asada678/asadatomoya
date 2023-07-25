import axios from "axios";
import { AdminApiEndpoint, WebApiEndpoint } from "./endpoint";

type EndPoint = AdminApiEndpoint | WebApiEndpoint;

export const post = async <T>({
  endpoint,
  payload,
  params = {},
}: {
  endpoint: EndPoint;
  payload: T;
  params?: { [key: string]: string | number };
}): Promise<T> => {
  console.log("endpoint:", endpoint);
  const requestPath = formatEndpoint(endpoint, params);
  const { data } = await axios.post<T>(requestPath, payload);
  return data;
};

function formatEndpoint(endpoint: EndPoint, params: { [key: string]: string | number }): string {
  let result = endpoint as string;
  for (const key in params) {
    result = result.replace(`:${key}`, params[key].toString());
  }
  return result;
}
