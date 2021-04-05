import { DexieError } from "dexie";
import { db, initDB } from ".";

export const wrapErrorHandler = <
  T extends (...args: any) => Promise<P>,
  P = any
>(
  fn: T
) => async (...args: Parameters<T>) => {
  try {
    return await fn(...args);
  } catch (e) {
    const error = e as DexieError;
    switch (error.name) {
      case "OpenFailedError":
        db.delete();
        initDB();
        await fn(...args);
        break;
      default:
        throw error;
    }
  }
};
