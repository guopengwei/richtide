import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const publicFiles = (await readdir("public")).filter((name) => /\.(?:html|js|css|webmanifest)$/.test(name));
const forbidden = [/platform_operator/i, /customer_support/i, /commercial_administrator/i, /CORE_LITE/, /COMPLETE_PRO/, /SNAPSHOT_FREE/, /UZI by RichTide/i];
const failures = [];
for (const name of publicFiles) {
  const content = await readFile(join("public", name), "utf8");
  for (const pattern of forbidden) if (pattern.test(content)) failures.push(`${name}: ${pattern}`);
}
if (failures.length > 0) { console.error(failures.join("\n")); process.exit(1); }
console.log(`copy audit passed for ${publicFiles.length} public files`);
