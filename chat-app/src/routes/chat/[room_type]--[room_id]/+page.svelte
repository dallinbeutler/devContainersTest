<script>
	// export let data../chat/[room_type]--[room_id]/$types.js;
	import topIcon from '$lib/images/format-vertical-align-top.png';
	import botIcon from '$lib/images/format-vertical-align-bottom.png';
	export let data;

	function scrollIntoView(){
		document.getElementById('topAnchor')?.scrollIntoView({behavior:'smooth'});
	}
	function scrollBottom(){
		document.getElementById('bottomAnchor')?.scrollIntoView({behavior:'smooth'});
	}
</script>

<h1>{data.room_type }</h1>
<h1>{data.room_id }</h1>

<div class="chatContainer">
	<div id="chatHeader" class="level is-mobile">
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
	<div id="main">
		<section id="chatArea">
			
			<span id="topAnchor" />
			<!-- ${Comments} -->
			<div class="msg-container msg-self"> 
				<div class="msg-box">
					<div class="initials is-2"></div>
					<div class="messages">wow </div>
				</div>
			</div>
			<div class="msg-container msg-remote"> 
				<div class="msg-box">
					<div class="initials is-2"></div>
					<div class="messages">funky </div>
				</div>
			</div>

			<article id="bottomAnchor" />
		</section>
		<!-- ${ScrollAction} -->
		<footer id="chatFooter"
		class="level is-mobile chat-input">
		<div id="chatTest"></div>
	</footer>
</div>
</div>
<style>
	.chatContainer {
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  /* overflow-y:clip; */
  /* overflow-x:clip; */
  height:100vh;
}
#main {
  /*overflow-y:auto;*/
	flex-grow: 1;
  height:100vh;
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

/*#chatFooter > .ql-snow {
  color:white;  
}*/
/*  #chatFooter > .ql-snow .ql-picker {
    color: white;
  }*/
#chatFooter  svg {
  background-color: white;
  border: white;
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


.msg-box { 
    background: #5b5e6c;
    padding: 10px 10px 0 10px;
    border-radius: 0 6px 6px 0;
    /*pref-width: 80%;*/ 
    width: 80%;
    float: left;
    box-shadow: 0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24);
}

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
}
</style>