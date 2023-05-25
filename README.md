# Server-sent event in Remix - SSE - WEB APIs

[MDN Web APIs - SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

Traditionally, a web page has to send a request to the server to receive new data; that is, the page requests data from the server. With server-sent events, it's possible for a server to send new data to a web page at any time, by pushing messages to the web page. These incoming messages can be treated as Events + data inside the web page.

HTTP - Stateless

HTTP Forever frame / long polling
HTTP:SSE is build on top ot the HTTP protocol. It uses HTTP headers, such as 'GET' and 'Content-Type' to initialize and maintain the connection between the server and the client.

    Event Stream Format: SSE defines a specific format for the data that is sent from the server to the client. The data is sent as a stream of events, where each event consists of one or more lines of text encoded in UTF-8. Each event can have a specific event name, associated data, and optional event ID. The format also supports retry mechanisms for re-establishing the connection in case of interruptions.

    MIME Type: SSE uses the text/event-stream MIME type to indicate the content type of the data being sent from the server to the client. This MIME type allows the client to interpret the response as an SSE stream and process it accordingly.

It's worth noting that SSE is a unidirectional communication protocol where the server sends updates to the client. If bidirectional communication is required, other technologies like WebSockets or server-side frameworks supporting bidirectional communication can be more suitable.

# [Remix Route File Naming](https://remix.run/docs/en/main/file-conventions/route-files-v2)

# [Resource Routes](https://remix.run/docs/en/1.16.1/guides/resource-routes)

Creates an basic SSE with ReadableStream Interface from Stream API
[ReadalbleStream MDN - Stream API](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)

[TextEncoder MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)

new TextEncoder().encode('Luna')
Uint8Array(4) [ 76, 117, 110, 97 ]
