export type SuccessRes<T> = T & { success: true };
export type ErrRes<T> = T & { success: false };
