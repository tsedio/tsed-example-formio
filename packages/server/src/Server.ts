import "@tsed/ajv";
import {$log, PlatformApplication} from "@tsed/common";
import {Configuration, Inject} from "@tsed/di";
import "@tsed/formio";
import "@tsed/mongoose";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/swagger";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import methodOverride from "method-override";
import {isProduction} from "./config/env";
import formioConfig from "./config/formio";
import mongooseConfig from "./config/mongoose";
import swaggerConfig from "./config/swagger";
import {VersionCtrl} from "./controllers/rest/version/VersionCtrl";

export const rootDir = __dirname;

// istanbul ignore next
if (isProduction) {
  $log.appenders.set("stdout", {
    type: "stdout",
    levels: ["info", "debug"],
    layout: {
      type: "json"
    }
  });

  $log.appenders.set("stderr", {
    levels: ["trace", "fatal", "error", "warn"],
    type: "stderr",
    layout: {
      type: "json"
    }
  });
}

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  logger: {
    disableRoutesSummary: isProduction
  },
  mount: {
    "/rest": [
      `${rootDir}/controllers/rest/**/*.ts`
    ],
    "/": [VersionCtrl]
  },
  swagger: swaggerConfig,
  views: {
    root: `${rootDir}/../views`,
    viewEngine: "ejs"
  },
  mongoose: mongooseConfig,
  formio: formioConfig,
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}
