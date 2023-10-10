import { writable, type Invalidator, type Readable, type Subscriber, type Unsubscriber, readable } from 'svelte/store';
import { connect, StringCodec, MsgHdrsImpl } from "nats";

export const messages = writable ([
	{ id: 1, content: 'Hello!', self: true },
	{ id: 2, content: 'Hi there!', self: false },
	{ id: 3, content: 'Hello!', self: true },
	{ id: 4, content: 'Hi there!', self: false },
	{ id: 5, content: 'Hello!', self: true },
	{ id: 6, content: 'Hi there!', self: false },
	{ id: 7, content: 'Hello!', self: true },
	{ id: 8, content: 'Hi there!', self: false },
	{ id: 9, content: 'Hello!', self: true },
	{ id: 10, content: 'Hi there!', self: false },
	{ id: 21, content: 'Hello!', self: true },
	{ id: 22, content: 'Hi there!', self: false },
	{ id: 23, content: 'Hello!', self: true },
	{ id: 24, content: 'Hi there!', self: false },
	{ id: 25, content: 'Hello!', self: true },
	{ id: 26, content: 'Hi there!', self: false },
	{ id: 27, content: 'Hello!', self: true },
	{ id: 28, content: 'Hi there!', self: false },
	{ id: 29, content: 'Hello!', self: true },
	{ id: 30, content: 'Hi there!', self: false },
	{ id: 31, content: 'Hi there!', self: false },
	{ id: 32, content: 'Hi there!', self: false },
	{ id: 33, content: 'Hi there!', self: false },
	{ id: 40, content: 'Hi there!', self: false },
	{ id: 41, content: 'Hi there!', self: false },
	{ id: 42, content: 'Hi there!', self: false },
	{ id: 43, content: 'Hi there!', self: false },    
	// Add more dummy messages as needed
]);
export const foo = writable("bar")

// async function start(){	
// 	console.log("started msg store")
// 	const subject = 'hello'
// 	try{
// 		const nc = await connect({servers: `nats-service:4222`})
// 		const sc = StringCodec();
// 		console.log("msg store connected")
// 		const sub = nc.subscribe(subject);
// 		(async () => {
// 				for await (const m of sub) {
// 					let msg = sc.decode(m.data);
// 					// msgs.update( (arr)=>{return [...arr,msg]} ) 
// 					// msg_value = [...msg_value,[m.sid,msg]]
// 					messages.update((arr) =>{return[...arr,{id:m.sid, content:msg, self:true}]})
					
// 					console.log(`[${sub.getProcessed()}]: ${msg}`);
// 				}
// 			})();					
// 		console.log("returning sub")
// 		return sub;
// 	} catch (err) {
// 		console.error("err");
// 		console.error(err);
// 	}	
// };

async function createFeed(){  
  // const {subscribe, set, update} = writable([]);
  console.log("started msg store")
  const subject = 'hello'
  try{
    const nc = await connect({servers: `nats-service:4222`})
    const sc = StringCodec();
    console.log("msg store connected")
    const sub = nc.subscribe(subject);
    (async () => {
        for await (const m of sub) {
          let msg = sc.decode(m.data);
          // msgs.update( (arr)=>{return [...arr,msg]} ) 
          // msg_value = [...msg_value,[m.sid,msg]]
          messages.update((arr) =>{return[...arr,{id:m.sid, content:msg, self:true}]})
          
          console.log(`[${sub.getProcessed()}]: ${msg}`);
        }
      })();					
    console.log("returning sub")
    
    return sub.closed;
  } catch (err) {
    console.error("err");
    console.error(err);
  }
}
export const feed = createFeed();