import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      base: "/star-wars-explorer-2026/",
      plugins: [
        {
          postcssPlugin: "remove-invalid-semantic-ui-tooltip-rule",
          Once(root) {
            const file = root.source?.input.file?.replaceAll("\\", "/");
            if (!file?.endsWith("/semantic-ui-css/semantic.min.css")) return;

            // Browsers already discard this invalid selector: pseudo-elements
            // cannot have descendant elements. Remove it before minification.
            root.walkRules(
              "[data-tooltip][data-inverted]:after .header",
              (rule) => {
                rule.remove();
              },
            );
          },
        },
      ],
    },
  },
});
