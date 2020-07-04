import * as React from "react";
import { useState, useEffect } from "react";

export default function RequestViewer({ server }: any) {
  const [requests, setRequests] = useState(server.getRequests());
  useEffect(() => {
    server.subscribe((requests: any) => {
      setRequests([...requests]);
    });
  }, []);
  return (
    <div>
      {requests.map((r: any, i: number) => (
        <div key={i}>
          <div>{r.data.operation.name}</div>
          <div>{JSON.stringify(r.data.variables)}</div>
          <div>
            <button onClick={r.resolveRequest}>resolve</button>
            <button onClick={r.rejectRequest}>reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
