import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import createCellsRouter from "./routes/cells.route";

const app = express();

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  return new Promise((resolve, reject) => {
    app.use("/cells", createCellsRouter(filename, dir));
    if (useProxy) {
      app.use(
        createProxyMiddleware({
          target: "http://localhost:3000",
          logLevel: "silent",
          ws: true,
        })
      );
    } else {
      const packagePath = require.resolve(
        "@js_editor_p/local-client/build/index.html"
      );
      app.use(express.static(path.dirname(packagePath)));
    }

    app
      .listen(port, () => {
        console.log("Express Server running");
      })
      .on("error", reject);
  });
};
