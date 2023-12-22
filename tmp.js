import fs from "node:fs/promises";

const readPjson = async () => {
  const pjsonPath = new URL("./package.json", import.meta.url).pathname;
  console.log(JSON.parse(await fs.readFile(pjsonPath, "utf-8")));
};

readPjson();
