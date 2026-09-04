import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const vendorDirectory = path.join(projectDirectory, "public", "vendor");
const gsapDirectory = path.join(projectDirectory, "node_modules", "gsap", "dist");

await mkdir(vendorDirectory, { recursive: true });
await Promise.all([
  copyFile(path.join(gsapDirectory, "gsap.min.js"), path.join(vendorDirectory, "gsap.min.js")),
  copyFile(
    path.join(gsapDirectory, "ScrollTrigger.min.js"),
    path.join(vendorDirectory, "ScrollTrigger.min.js"),
  ),
]);

console.log("Prepared self-hosted GSAP animation files.");
