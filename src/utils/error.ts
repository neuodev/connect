import { Error as MongooseErr } from "mongoose";

export function getErrMsg(err: unknown): string {
  let msg = "Unkown error";

  if (err instanceof Error) msg = err.message;
  else if (err instanceof MongooseErr) msg = `${err.name}: ${err.message}`;

  return msg;
}

export async function errorHandler<P, R>(func: (p: P) => Promise<R>) {
  return async function call(params: P): Promise<R | { error: string }> {
    try {
      return await func(params);
    } catch (error) {
      return {
        error: getErrMsg(error),
      };
    }
  };
}
