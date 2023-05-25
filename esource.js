import EventSource from 'https://deno.land/x/eventsource/mod.ts';

// URL of the server stream
const streamUrl = 'http://localhost:3000/stream';

// Create a new EventSource object
const eventSource = new EventSource(streamUrl);

// Event handler for 'message' event
eventSource.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Received data:', data);
});

// Event handler for 'error' event
eventSource.addEventListener('error', (error) => {
  console.error('An error occurred:', error);
});

