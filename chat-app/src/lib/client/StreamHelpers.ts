  import type { Readable } from 'svelte/store';
import { source } from 'sveltekit-sse'
  export function readableArrayFromServer<MType>(apiEndpoint:string){
    const connection = source(apiEndpoint).onError(event => console.error({ event }))
    const value = connection.select('message')
    const transformed :Readable<Array<MType>> = value.transform(stream => {
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
        let myStore :Array<MType>= []
        while (({ value } = await reader.read())) {
          if (value != undefined){
            console.log("update - ",value);
            let m:MType = JSON.parse(value)
            myStore = [...myStore,m]
            state.listeners.forEach(callback => callback(myStore))
          }

        }
      }

      start()

      return store
    })
    return transformed;
}