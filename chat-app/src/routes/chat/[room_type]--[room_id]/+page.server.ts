import { error } from '@sveltejs/kit';
// import type {ServerWebSocket, WebSocketHandler} from "svelte-adapter-bun";
// import { connect, StringCodec, type Msg, MsgHdrsImpl } from "nats";
import { writable, type Invalidator, type Readable, type Subscriber, type Unsubscriber } from 'svelte/store';
import { connect, StringCodec, MsgHdrsImpl } from "nats";


export function load({ params }:any) {
	// const encoder = new TextEncoder();
	// let readable = new ReadableStream({
	// 	async start(controller) {
	// 	try{
	// 		const sc = StringCodec();
	// 		const nc = await connect({servers: `nats-service:4222`});
	// 		console.log(`connected to ${nc.getServer()}`);
	// 		const sub = nc.subscribe("hello");
	// 		for await (const m of sub) {				
	// 			let str = sc.decode(m.data)
	// 			console.log(`[${sub.getProcessed()}]: ${str}`);
	// 			controller.enqueue(encoder.encode(str));
	// 		}
	// 		console.log("subscription closed");
	// 		nc.close()
	// 		controller.close()
	// 		}
	// 	catch(err){			
	// 		console.error(err);
	// 		throw err
	// 	}
  //   }
	// })


	
	//const post = posts.find((post) => post.slug === params.slug);

	if (!params.room_id || !params.room_type) throw error(404);
  console.log(`loading room id `,params.room_id , `and type `, params.room_type);
	return {
		room_type: params.room_type,
		room_id: params.room_id,
		//messages:readable
	}
}


// async function connectToNats(){
// 	try {
// 		const nc = await connect({servers: `nats-service:4222`});
// 		console.log(`connected to ${nc.getServer()}`);
// 		// this promise indicates the client closed
// 		const done = nc.closed();
// 		// do something with the connection
// // create a codec
// 		const sc = StringCodec();
// 		// create a simple subscriber and iterate over messages
// 		// matching the subscription
// 		const sub = nc.subscribe("hello");
// 		(async () => {
// 			for await (const m of sub) {
// 				console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
// 			}
// 			console.log("subscription closed");
// 		})();
// 		// check if the close was OK
// 		const err = await done;
// 		if (err) {
// 			console.log(`error closing:`, err);
// 		}
// 	} catch (err) {
// 		console.log(`error connecting to ${JSON.stringify(nc.getServer())}`);
// 	}
// }
// const nc = await connect({servers: `nats-service:4222`})

// /** @type {import("svelte-adapter-bun").WebSocketHandler} */
// export const _handleWebsocket:WebSocketHandler  = {
//   open(ws: ServerWebSocket) {
//     console.log("WebSocket opened");
//     ws.send("Slava Ukraїni");
//   },
//   /**
//    * @param {Request} request
//    * @param {Function} upgrade
//    */
//   upgrade(request: Request, upgrade: any) {
//     const url = new URL(request.url);
//     if (url.pathname.startsWith("/ws")) {
//       return upgrade(request);
//     }
//   },
//   message: function (ws: ServerWebSocket, message) {
//     throw new Error("Function not implemented.");
//   }
// };

// let ncStream = readable<Msg>( undefined , function start(set){	
// 	console.log("started")
// 	const subject = 'hello'
// 	const nc = connect({servers: `nats-service:4222`})
// 	.then( nc => {
// 		const sc = StringCodec();
// 		const sub = nc.subscribe(subject);
// 		(async () => {
// 			for await (const m of sub) {
// 				set(m)
// 				console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
// 			}
// 			console.log("subscription closed");
// 		})();
		
// 		return function stop(){
// 			sub.unsubscribe();
			
// 		}
// 	});
// 	});


// import { connect, StringCodec, type Msg, MsgHdrsImpl } from "nats";
// //import { readable,   type Invalidator, type Readable, type Subscriber, type Unsubscriber } from 'svelte/store';
// import {writable} from 'svelte/store'
  
// const msgs = writable<string[]>([]);
// async function start(){	
// 	console.log("started msg store")
// 	const subject = 'hello'
//   try{
//     const nc = await connect({servers: `nats-service:4222`})
//     const sc = StringCodec();
//     console.log("msg store connected")
//     const sub = nc.subscribe(subject);
//     (async () => {
//         for await (const m of sub) {
//           let msg = sc.decode(m.data);
//           msgs.update( (arr)=>{return [...arr,msg]} ) 
          
//           console.log(`[${sub.getProcessed()}]: ${msg}`);
//         }
// 			})();					
    
// 		return sub;
//   } catch (err) {
// 		console.log(`error connecting to ${JSON.stringify(err)}`);
// 	}	
// };

// import {messageStore,start} from "./natsConnect"



