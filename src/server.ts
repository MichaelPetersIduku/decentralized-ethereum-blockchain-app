import app from "./app";
import serverless from "serverless-http";

  if (process.env.ENVIRONMENT === "lambda") {
    module.exports.handler = serverless(app);
  } else {
    const server = app
    .listen(app.get("port"), () => {
      console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
      );
      console.log("  Press CTRL-C to stop\n");
    })
    .on("error", (err: any) => {
      console.log(err);
    });
    module.exports.server = server;
  }