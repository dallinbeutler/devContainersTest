
import { connect } from "nats";
import type {ServerWebSocket, WebSocketHandler} from "svelte-adapter-bun";
const servers = [
  { servers: "nats-service:4222" },
  // { servers: ["demo.nats.io:4442", "demo.nats.io:4222"] },
  // { servers: "demo.nats.io:4443" },
];
await servers.forEach(async (v) => {
  try {
    const nc = await connect(v);
    console.log(`connected to ${nc.getServer()}`);
    // this promise indicates the client closed
    const done = nc.closed();
    // do something with the connection

    // close the connection
    await nc.close();
    // check if the close was OK
    const err = await done;
    if (err) {
      console.log(`error closing:`, err);
    }
  } catch (err) {
    console.log(`error connecting to ${JSON.stringify(v)}`);
  }
});

/** @type {import("svelte-adapter-bun").WebSocketHandler} */
export const _handleWebsocket:WebSocketHandler  = {
  open(ws: ServerWebSocket) {
    console.log("WebSocket opened");
    ws.send("Slava Ukraїni");
  },
  /**
   * @param {Request} request
   * @param {Function} upgrade
   */
  upgrade(request: Request, upgrade: any) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/ws")) {
      return upgrade(request);
    }
  },
  message: function (ws: ServerWebSocket, message) {
    throw new Error("Function not implemented.");
  }
};