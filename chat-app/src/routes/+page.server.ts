// // hooks.server.js
// import { connect, ErrorCode, NatsError, type ConnectionOptions } from "nats.ws";
// const servers = [
//   { servers: ["ws://localhost:9222"] },
//   // { port: 4222 },
//   // { port: 9222 },
// ];
// await servers.forEach(async (v) => {
//   try {
//     // let options: ConnectionOptions = {
//     //   user: "ruser",
//     //   pass: "T0pS3cr3t",
//     //   timeout: 2,
//     //   servers: v.servers
//     // }
//     const nc = await connect(v);
//     console.log(`connected to ${nc.getServer()}`);
//     // this promise indicates the client closed
//     const done = nc.closed();
//     // do something with the connection

//     // close the connection
//     await nc.close();
//     // check if the close was OK
//     const err = await done;
//     if (err) {
//       console.log(`error closing:`, err);
//     }
//   } catch (err: any) {
//     console.log(`error connecting to ${JSON.stringify(v)}`);
//     switch (err.code) {
//       case ErrorCode.NoResponders:
//         console.log("no one is listening to 'hello.world'");
//         break;
//       case ErrorCode.Timeout:
//         console.log("someone is listening but didn't respond");
//         break;
//       default:
//         console.log("request failed", err);
//     }
//   }
// });
// // const conn = await connect(
// //   {
// //     servers: ["ws://127.0.0.1:4222", "wss://127.0.0.1:4222", "127.0.0.1:4222"],
// //   },
// // );
// // console.log (conn.getServer());
// // // write some code that runs
// // console.log("WebSned");

import { connect } from "nats";
const servers = [
  { servers: "nats-service:4222" },
  { servers: ["demo.nats.io:4442", "demo.nats.io:4222"] },
  { servers: "demo.nats.io:4443" },
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
export const handleWebsocket = {
  open(ws: WebSocket) {
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
  message: function (ws: WebSocket, message: MessageEvent) {
    throw new Error("Function not implemented.");
  }
};