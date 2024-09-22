import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, Fetcher, FetchFn } from "@tanstack/start";

/**
 * In this example we are creating an abstraction "inside" `createServerFn`
 * that console.logs the payload passed into the function.
 *
 * This function does not execute properly as `fn` is removed by compiler.
 * (At least I think that's what's going on 🤷).
 *
 * Error we get is:
 *   ReferenceError: fn is not defined
 */

function createServerFnWithConsoleLog<
  TMethod extends "GET" | "POST",
  TPayload = undefined,
  TResponse = unknown,
>(
  method: TMethod,
  fn: FetchFn<TPayload, TResponse>
): Fetcher<TPayload, TResponse> {
  return createServerFn(method, async (payload, context) => {
    console.log("Payload:", payload);

    return await fn(payload, context);
  });
}

const hello = createServerFnWithConsoleLog(
  "GET",
  async ({ name }: { name: string }) => {
    return `Hello ${name}!`;
  }
);

export const Route = createFileRoute("/abstraction-inside")({
  component: Page,
  loader: async () => await hello({ name: "John" }),
});

function Page() {
  const message = Route.useLoaderData();

  return <div>{message}</div>;
}
