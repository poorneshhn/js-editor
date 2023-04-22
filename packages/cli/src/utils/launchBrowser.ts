const launchBrowser = (url: string) => {
  let start: string;
  if (process.platform === "darwin") {
    start = "open";
  } else if (process.platform === "win32") {
    start = "start";
  } else {
    start = "xdg-open";
  }

  require("child_process").exec(`${start} ${url}`);
};

export default launchBrowser;
