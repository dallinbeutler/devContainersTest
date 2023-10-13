import {  type Invalidator, type Readable, type Subscriber, type Unsubscriber, readable } from 'svelte/store';
import { connect, StringCodec, MsgHdrsImpl } from "nats";
import { tick } from 'svelte';
type myMess = {
  id:number,
  content:string,
  self:boolean
}

export let Oldmessages = [
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
];

type Message = {
  id:number,
  content:string,
  self:boolean
}
let unsubscribe: () => void;
export let messages :Array<Message>= [];
// Unsubscribe from realtime messages
export async function jsSub() {
    // Get initial messages
    console.log(`mountin`);
const sc = StringCodec();
const subject = 'hello'
try{
  const nc = await connect({servers: `nats-service:4222`})
  unsubscribe = nc.close
  const js = nc.jetstream();
  const c = await js.consumers.get("hello")

  while (true) {
  console.log("waiting for messages");
  const messageC = await c.consume({max_messages:1});
  try {
    for await (const m of messageC) {       
      console.log(m.seq);
      messages = [...messages, {id:m.sid, content:"",self:true}]
      m.ack();
      //    //console.log(`[${sub.getProcessed()}]: ${msg}`);
    }
  } catch (err) {
    console.log(`consume failed: ${err}`);
  }    
}   
}
catch (err) {
  console.error(err);
} 
}