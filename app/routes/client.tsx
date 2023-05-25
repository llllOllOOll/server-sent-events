import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

export function loader({ request }: LoaderArgs) {
  return json({ name: "seven" });
}

export default function Home() {
  const data = useLoaderData<typeof loader>();

  let people = useEventSource("/sse", { event: "message" });

  return (
    <>
      <h1 className="mt-20 text-center text-3xl text-white">{people}</h1>
    </>
  );
}

type EventSourceOptions = {
  init?: EventSourceInit;
  event?: string;
};

export function useEventSource(
  url: string | URL,
  { event = "message", init }: EventSourceOptions = {}
) {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(url, init);
    eventSource.addEventListener(event ?? "message", handler);

    setData(null);

    function handler(event: MessageEvent) {
      setData(event.data || "UNKNOWN_EVENT_DATA");
    }

    return () => {
      eventSource.removeEventListener(event ?? "message", handler);
      eventSource.close();
    };
  }, [url, event, init]);

  return data;
}
