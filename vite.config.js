import { defineConfig } from "vite";
import structuredClone from "structured-clone";

global.structuredClone = global.structuredClone || structuredClone;

export default defineConfig({
  // Your Vite configuration here
});
