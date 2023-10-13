<script lang="ts">
	import topIcon from '$lib/images/format-vertical-align-top.png';
	import botIcon from '$lib/images/format-vertical-align-bottom.png';
  // import {messages,foo,feed} from './natsStore'
  // import {createFeed,messages} from './natsStore'
  import { connect, StringCodec } from "nats";
  import { onDestroy, onMount } from 'svelte';  
	export let data;
	function scrollIntoView(){
		document.getElementById('topAnchor')?.scrollIntoView({behavior:'smooth'});
	}
	function scrollBottom(){
		document.getElementById('bottomAnchor')?.scrollIntoView({behavior:'smooth'});
	}
  type Message = {
  id:number,
  content:string,
  self:boolean
}
let messages: string[]  = []
async function subscribe() {
    const response = await fetch('/chat/?type=' + data.room_type + '&room_id=' + data.room_id);
    if (response.body != undefined){
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        console.log(value);
        messages.push(value)
        //triggers svelte recompute on an array if IDs aren't present
        messages = messages
      }
    }
  }
  onMount(subscribe);
// async function subscribe() {
//   try{
//     const sc = StringCodec();
    
//     let messageReader = data.messages.pipeThrough(new TextDecoderStream() ).getReader()
//     while (true) {
//       const { value, done } = await messageReader.read();
//       if (done) break;
//       messages.push(value)
//       messages = messages
//     }
//     }
//   catch (err){
//     console.error(err);
//   }

//   }
  

// onMount(subscribe);

</script>

<h1>{data.room_type }</h1>
<h1>{data.room_id }</h1>
<div id="chat">
  <div id="chatHeader">
    <div class="level-left"></div>
    <div class="level-right">
    <button 
    class="button" 
    on:click={scrollIntoView}>
    <img style="height:25px;margin:5px;"
    src="{topIcon}" 
    title="topAnchor" 
    alt="top"
    loading="lazy" />
  </button>
  <button class="button" on:click={scrollBottom}>
    <img style="height:25px;margin:5px;" 
    src="{botIcon}" 
    title="bottomAnchor" 
    loading="lazy" 
    alt="bot"
    />
  </button>
</div>
</div>
<section id="messagesArea">
  
  <span id="topAnchor" />
  <!---------------------- Comments ----------------------------->

  <!-- {#await promise}
	<p>...waiting</p>
{:then stop}
  {#each $times as time (time)}
	<p>The number is </p>
  {/each}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await} -->

  
{#each messages as message}
<div class="msg-container" >
<!-- {message.self ? 'msg-self' : 'msg-remote'}">  -->
  <div class="msg-box">
    <div class="initials is-2"></div>
    <div class="messages">{message}</div>
  </div>
</div>
{/each}

<article id="bottomAnchor" />
</section>
<!-- ${ScrollAction} -->
<footer id="chatFooter"
class="chat-input">
<textarea></textarea>
<button>submit</button>
</footer>
</div>
<style>
  
#chat{
  display: flex;
  flex-direction: column;
  align-content: space-between;
  overflow: auto;
}  
  
#messagesArea{
  overflow-y: scroll; 
  /* display: flex;
  flex-direction: column;   
  */
  /* flex-grow: 1;  */
}

.msg-box { 
    background: #5b5e6c;
    padding: 10px 10px 0 10px;
    border-radius: 0 6px 6px 0;
    width: 80%;
    float: left;
    box-shadow: 0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24);
}
/* 
.user-img {
    display: inline-block;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background: #2671ff;
    margin: 0 10px 10px 0;
}

.flr {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    width: calc(100% - 50px);
}


.msg {
  display: inline-block;
  font-size: 1.1em;
  line-height: 16pt;
  color: rgba(255,255,255,.7);
  margin: 0 0 4px 0;
  white-space: pre-wrap;
}

    .msg:first-of-type {
        margin-top: 8px;
    }

.timestamp {
    color: rgba(0,0,0,.58);
    font-size: .8em;
    margin-bottom: 10px;
}

.username {
    margin-right: 3px;
}

.posttime {
    margin-left: 3px;
}

.msg-self .msg-box {
    border-radius: 6px 0 0 6px;
    background: #2671ff;
    float: right;
    text-align:left;
}


.msg-self .user-img {
    margin: 0 0 10px 10px;
}

.msg-self .msg {
    text-align: left;
}

.msg-self .timestamp {
    text-align: right;
} */








/* #main {
  overflow-y:auto;
}

#chatArea {
  flex-grow:1;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}

#bottomAnchor {
  width: 100%;
  float: left;
  height:1px;
}
#chatFooter {
  display:block;
}

.chat-input {
  
  border-top: 1px solid #2671ff;
  margin-left: 0em;
}

.chat-input input {
    outline: 0 none;
    border: none;
    color: white;
    text-indent: 10px;
    font-size: 1em;
    background: #40434e;
}
.chat-input + div{
    padding:0px;
}

.chat-input button {
    float: right;
    outline: 0 none;
    border: none;
    background: rgba(255,255,255,.25);
    height: 40px;
    width: 40px;
    border-radius: 50%;
    padding: 2px 0 0 0;
    margin: 10px;
    transition: all 0.15s ease-in-out;
}

.chat-input input[good] + button {
    box-shadow: 0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24);
    background: #2671ff;
}

    .chat-input input[good] + button:hover {
        box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    }

    .chat-input input[good] + button path {
        fill: white;
    }

#chatHeader {
  margin:0;
}
 */
</style>