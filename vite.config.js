import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [{
        postcssPlugin: 'remove-invalid-semantic-ui-tooltip-rule',
        Once(root) {
          const file = root.source?.input.file?.replaceAll('\\', '/')
          if (!file?.endsWith('/semantic-ui-css/semantic.min.css')) return

          // Browsers already discard this invalid selector: pseudo-elements
          // cannot have descendant elements. Remove it before minification.
          root.walkRules('[data-tooltip][data-inverted]:after .header', (rule) => {
            rule.remove()
          })
        },
      }],
    },
  },
})
