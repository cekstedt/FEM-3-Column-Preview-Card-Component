"use strict";

const fs = require("fs").promises;
const parse = require("node-html-parser").parse;

Promise.all([
  fs.readFile("src/index.html"),
  fs.readFile("tools/pixel-glass.html"),
  fs.mkdir("dev", { recursive: true })
])
  .then(([index, pixelGlass]) => {
    const root = parse(index.toString(), { comment: true });
    const tool = parse(pixelGlass.toString(), { comment: true });

    root.querySelector("head").appendChild(tool);

    return fs.writeFile("dev/index.html", root.toString());
  })
  .catch(error => {
    console.error(error.message);
    process.exit(1);
  });
