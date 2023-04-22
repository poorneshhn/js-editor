import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service: esbuild.Service;
interface bundleReturnType {
  code: string;
  error: string;
}
const bundle = async (rawCode: string): Promise<bundleReturnType> => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.57/esbuild.wasm",
    });
  }

  try {
    let result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });
    return {
      code: result.outputFiles[0].text,
      error: "",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        code: "",
        error: error.message,
      };
    } else {
      throw error;
    }
  }
};

export default bundle;
