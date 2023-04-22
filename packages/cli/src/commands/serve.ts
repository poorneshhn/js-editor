import { Command } from "commander";
import { serve } from "@js_editor_p/local-api";
import path from "path";
interface LocalApiError {
  code: string;
}

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .option("-p, --port <number>", "port to run server on", "4005")
  .description("open a file for editing")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    let dir = path.join(process.cwd(), path.dirname(filename));
    try {
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opened the file ${filename}. Navigate to http://localhost:${options.port} in the browser to edit the file.`
      );
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
      }
      process.exit(1);
    }
  });
