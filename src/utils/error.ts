import { Error as MongooseErr } from "mongoose";
import { ErrRes } from "../types";

export function getErrMsg(err: unknown): string {
  let msg = "Unkown error";

  if (err instanceof Error) msg = err.message;
  else if (err instanceof MongooseErr) msg = `${err.name}: ${err.message}`;

  return msg;
}

export function errorHandler<P, R>(func: (p: P) => Promise<R>) {
  return async function call(
    params: P
  ): Promise<R | ErrRes<{ error: string }>> {
    try {
      return await func(params);
    } catch (error) {
      return {
        success: false,
        error: getErrMsg(error),
      };
    }
  };
}
