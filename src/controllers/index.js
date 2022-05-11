import { readdirSync } from "fs";
import { join } from "path";
let modules = {};

readdirSync(__dirname).forEach((file) => {
  if (file !== "index.js" && (file.endsWith(".js") || file.endsWith(".ts"))) {
    let key = file.replace(".js", "").replace(".ts", "");
    const Controller = require(join(__dirname, key)).default;
    modules[key.replace("Controller", "")] = Controller;
  }
});

export default modules;
