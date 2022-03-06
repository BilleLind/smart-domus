import { writable } from 'svelte/store';

export const createWritableStore = (key, startValue) => {
  const { subscribe, set } = writable(startValue);

  return {
    subscribe,
    set,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }

      subscribe((current) => {
        console.log(current)
        localStorage.setItem(key, JSON.stringify(current));
      });
    },
  };
};
/* rewrite it so i can utilize it for multiple => export createWriteable */
export const theme = createWritableStore('theme' ,{mode:'dark', color:'green'})



