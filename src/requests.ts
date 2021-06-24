import * as R from "fp-ts/Reader";
import * as TE from "fp-ts/TaskEither";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { IO } from "fp-ts/IO";

const API_ROOT =
  process.env.REACT_APP_BACKEND_URL || "https://conduit.productionready.io/api";

const instance = axios.create({
  baseURL: API_ROOT,
});

const onFailed = (reason: unknown) => {
  if (axios.isAxiosError(reason)) {
    return reason as AxiosError<unknown>;
  }

  throw reason;
};

export type Request<E = unknown, A = unknown> = TE.TaskEither<AxiosError<E>, AxiosResponse<A>>

const requests = {
  del: TE.tryCatchK(
    (url: string, config?: AxiosRequestConfig) =>
      instance.delete<unknown>(url, config),
    onFailed
  ),
  get: TE.tryCatchK(
    (url: string, config?: AxiosRequestConfig) =>
      instance.get<unknown>(url, config),
    onFailed
  ),
  put: TE.tryCatchK(
    <T>(url: string, body?: T, config?: AxiosRequestConfig) =>
      instance.put<unknown>(url, body, config),
    onFailed
  ),
  post: TE.tryCatchK(
    <T>(url: string, body?: T, config?: AxiosRequestConfig) =>
      instance.post<unknown>(url, body, config),
    onFailed
  ),
};

export default requests;

export function configureAxiosDefaults(
  configure: R.Reader<AxiosRequestConfig, void>
): IO<void> {
  return () => {
    return configure(instance.defaults);
  }
}
