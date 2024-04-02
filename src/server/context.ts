import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

interface CreateInnerContextOptions
  extends Partial<FetchCreateContextFnOptions> {}

export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {};
}

export async function createContext(opts: FetchCreateContextFnOptions) {
  const contextInner = await createContextInner({});

  return {
    ...contextInner,
  };
}

export type Context = inferAsyncReturnType<typeof createContextInner>;
