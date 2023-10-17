<script lang="ts">
    import type { Readable } from 'svelte/store';
    import type {Message} from './Message'
  // src/routes/+page.svelte
  import { source } from 'sveltekit-sse'

  const connection = source('/asyncTest').onError(event => console.error({ event }))
	const value = connection.select('message')
	const transformed :Readable<Array<Message>> = value.transform(stream => {
    let state = {
      /** @type {Array<function(string):void>}*/
      listeners: [],
    }
    const reader = stream.getReader()
    const store = {
      subscribe(callback:any) {
        if (!state.listeners.includes(callback)) {
          state.listeners.push(callback)
					console.log("callback Registered");
        }

        return () => (state.listeners = state.listeners.filter(value => value !== callback))
      },
    }

    const start = async function () {
      let value :undefined| string = undefined
      let myStore :Array<Message>= []
      while (({ value } = await reader.read())) {
				if (value != undefined){
					console.log("update - ",value);
          let m:Message = JSON.parse(value)
					myStore = [...myStore,m]
					state.listeners.forEach(callback => callback(myStore))
				}

      }
    }

    start()

    return store
	})

</script>
<!-- {$value} -->

<!-- {@html  $transformed } -->
<!-- 
 -->

<!-- <button on:click={addToArray}>
	Add item
</button>

-->
{#if $transformed}
{#each $transformed as item (item.id)}
<p>
  {item.author} said  {item.content}
</p>
{/each}	
{/if}
<!-- {#await transformed}
{:then items} 
	
{/await} -->