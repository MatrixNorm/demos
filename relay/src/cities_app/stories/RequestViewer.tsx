import * as React from "react";
import { useState, useEffect } from "react";
import { Request, Server } from "../resolvers/server";

export default function RequestViewer({ server }: { server: Server }) {
  const [state, setState] = useState(server.getState());
  useEffect(() => {
    server.subscribe((state) => {
      setState({ ...state });
    });
  }, []);
  return (
    <div>
      {state.requests.map((r) => (
        <div key={r.id}>
          <div>{r.data.operation.name}</div>
          <div>{JSON.stringify(r.data.variables)}</div>
          <div>
            <button
              onClick={() => {
                server.resolveRequest(r.id);
              }}
            >
              resolve
            </button>
            <button
              onClick={() => {
                server.rejectRequest(r.id);
              }}
            >
              reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
