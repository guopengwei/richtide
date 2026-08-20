import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) files.push(...(entry.isDirectory() ? await walk(join(directory, entry.name)) : [join(directory, entry.name)]));
  return files;
}
const files = await walk("src");
const source = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");
const forbidden = ["api.openai.com", "OPENAI_API_KEY", "BYOK", "Reference_Only/UZI", "eval(", "new Function("];
const failures = forbidden.filter((value) => source.includes(value));
const worker = await readFile("src/app.ts", "utf8");
for (const directive of ["content-security-policy", "x-content-type-options", "permissions-policy", "frame-ancestors 'none'"]) if (!worker.includes(directive)) failures.push(`missing ${directive}`);
if (failures.length > 0) { console.error(failures.join("\n")); process.exit(1); }
console.log(`security audit passed for ${files.length} source files`);
