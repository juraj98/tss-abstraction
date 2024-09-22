import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

/**
 * In this example we are creating an abstraction "around" `createServerFn`
 * that runs console.log before running the server function.
 *
 * The first `helloWithUseServer` function executes properly, because it contains
 * "use server" in the function body. While this works, it's not ideal since it
 * would have to be included in every server function.
 *
 * The second `helloWithoutUseServer` function does not execute properly, as it
 * lacks the "use server" directive in the function body.
 *
 * Error we get is:
 *   Invariant failed: createServerFn must be called with a function that is marked
 *   with the 'use server' pragma. Are you using the @tanstack/router-plugin/vite ?
 */

const createServerFnWithConsoleLog: typeof createServerFn = (...args) => {
  console.log("Server function ran");

  return createServerFn(...args);
};

const helloWithUseServer = createServerFnWithConsoleLog("GET", async () => {
  "use server";
  return 'Hello with "use server"';
});

const helloWithoutUseServer = createServerFnWithConsoleLog("GET", async () => {
  return 'Hello without "use server"';
});

export const Route = createFileRoute("/abstraction-around")({
  component: Page,
  loader: async () => {
    return {
      withUseServer: await helloWithUseServer(),
      withoutUseServer: await helloWithoutUseServer(),
    };
  },
});

function Page() {
  const { withUseServer, withoutUseServer } = Route.useLoaderData();

  return (
    <div>
      <div>{withUseServer}</div>
      <div>{withoutUseServer}</div>
    </div>
  );
}
