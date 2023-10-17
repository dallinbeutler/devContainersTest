import { connect, StringCodec, MsgHdrsImpl } from "nats";

// /** @type {import('./$types').RequestHandler} */
//@ts-ignore
export function GET({ url}) {
  try {
    console.log(url);
    console.log("getting " ,url.searchParams.get('type'),' - ',url.searchParams.get('room_id'))

    const encoder = new TextEncoder();
	  let readable = new ReadableStream({    
		async start(controller) {
		try{
			const sc = StringCodec();
			const nc = await connect({servers: `nats-service:4222`});
      const js = nc.jetstream();
      const stream = await js.consumers.get("hello")
    
			console.log(`connected to ${nc.getServer()}`);
			// const sub = nc.subscribe("hello");
      const messages = await stream.consume()
			for await (const m of messages) {				
				let str = sc.decode(m.data)
				console.log(`[${m.seq}]: ${str}`); 
				controller.enqueue(m.data);
			}
			console.log("subscription closed");
			nc.close()
			controller.close()
			}
		catch(err){			
			console.error(err);
			throw err
		}
    },
    cancel(){
      //todo close gracefully...
    }
	},new CountQueuingStrategy({highWaterMark:1}))
  
    return new Response(readable, {
      headers: {
        'content-type': 'text/event-stream',
      }
    });
  }
  catch(err) {
    console.error("failed to get room")
  }
  
  
}