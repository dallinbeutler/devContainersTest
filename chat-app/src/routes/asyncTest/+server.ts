// src/routes/custom-event/+server.js
import { connect, StringCodec, MsgHdrsImpl } from "nats";
import { event } from 'sveltekit-sse'
import type {Message} from './Message'
/**
 * @param {number} milliseconds
 * @returns
 */
// const delay = milliseconds => new Promise(r => setTimeout(r, milliseconds))

// export function GET() {
//   return event(async emit => {
//     while (true) {
//       emit(`${Date.now()}`)
//       await delay(1000)
//     }
//   }).toResponse()
// }



export function GET({ url}) {
  try {
    console.log(url);
    console.log("getting " ,url.searchParams.get('type'),' - ',url.searchParams.get('room_id'))

    const encoder = new TextEncoder();
		
		return event (async emit => {
			try{
			const sc = StringCodec();
			const nc = await connect({servers: `nats-service:4222`});
      const js = nc.jetstream();
      const stream = await js.consumers.get("foo")
    
			console.log(`connected to ${nc.getServer()}`);
			// const sub = nc.subscribe("hello");
      const messages = await stream.consume()
			for await (const m of messages) {				
				let str = sc.decode(m.data)
				let author :number= Number.parseInt(m.subject.substring(4))
				console.log(`[${m.seq}]: ${author} said: ${str}`); 
				let formatted :Message= {id:m.seq, author:author, content:str} 
				emit(JSON.stringify(formatted))
			}
			console.log("subscription closed");
			nc.close()
			}
		catch(err){			
			console.error(err);
			throw err
		}
    }).toResponse()
	
  }
  catch(err) {
    console.error("failed to get room")
  }
  
  
}