import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  return (
    <div>
      <p>
        There are two routes in this example. Both cover different cases of
        creating abstraction around <code>createServerFn</code>. Both routes
        crash as is.
      </p>
      <ul>
        <a href="/abstraction-around">
          <li>
            Go to{" "}
            <b>
              Abstraction around <code>createServerFn</code>
            </b>
          </li>
        </a>
        <a href="/abstraction-inside">
          <li>
            Go to{" "}
            <b>
              Abstraction inside <code>createServerFn</code>
            </b>
          </li>
        </a>
      </ul>
    </div>
  );
}
