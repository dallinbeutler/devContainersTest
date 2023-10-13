<script lang="ts">
  import { onMount } from 'svelte';

  let result: string[] = [];

  async function subscribe() {
    const response = await fetch('/asyncTest');
    if (response.body != undefined){
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        result.push(value)
        result = result
      }
    }
  }

  onMount(subscribe);
</script>

{#each result as str}
  <p>{str}</p>
{/each}