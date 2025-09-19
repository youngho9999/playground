"use client";

import { useState } from "react";

export default function GetSsePage() {
  const [messages, setMessages] = useState<string[]>([]);

  const onClick = () => {
    const eventSource = new EventSource("http://localhost:8080/sse");

    eventSource.addEventListener("message", (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    });

    eventSource.onerror = () => {
      eventSource.close(); //연결 끊기
    };
  };

  return (
    <>
      <button onClick={onClick}>click</button>
      <div className="App">
        <h1>Server-Sent Events</h1>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </>
  );
}