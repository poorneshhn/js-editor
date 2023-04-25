import { Command } from "commander";
import { serve } from "@js_editor_p/local-api";
import path from "path";
import launchBrowser from "../utils/launchBrowser";
interface LocalApiError {
  code: string;
}

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      const url = `http://localhost:${options.port}`;

      console.log(
        `Opened the file ${filename} to edit on ${url} in the browser.`
      );

      launchBrowser(url);
    } catch (error) {
      const isLocalApiError = (err: any): err is LocalApiError => {
        return typeof err.code === "string";
      };
      if (isLocalApiError(error)) {
        if (error.code === "EADDRINUSE") {
          console.error(
            `Port ${options.port} is in use. Try using a different port. For example "node index.js filename -p 5000"`
          );
        }
      } else if (error instanceof Error) {
        console.error("here is the problem", error.message);
      } else {
        console.log(error, "error");
      }
      process.exit(1);
    }
  });
