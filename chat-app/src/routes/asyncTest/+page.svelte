<script lang="ts">
    import type { Readable } from 'svelte/store';
    import type {Message} from './Message'
    import {readableArrayFromServer} from '$lib/client/StreamHelpers'
  // src/routes/+page.svelte  
  const transformed = readableArrayFromServer<Message>("/asyncTest")

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