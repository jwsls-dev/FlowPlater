import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./vitest.setup.ts"],
		include: ["tests/**/*.test.ts", "tests/**/*.spec.ts"],
		coverage: {
			reporter: ["text", "html"],
		},
	},
});


