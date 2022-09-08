import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import sveltePreprocess from "svelte-preprocess"

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        scss: { prependData: `@import 'src/styles/variables.scss';` },
      }),
    }),
  ],
})
