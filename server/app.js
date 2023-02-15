import express from "express";
import expressStaticGzip from "express-static-gzip";
import { join } from "path";
import fallback from "express-history-api-fallback";
import { fileURLToPath } from "url";
import path from "path";
import packageJson from "../package.json" assert { type: 'json' };

const version = packageJson.version;

const port = process.env.PORT || 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticFilesRegex = /\.(?:jpg|jpeg|gif|png|mp3|js|css|ttf|woff2)/;
const root = join(__dirname, "../dist");

app.get("/version", (request, response) => {
  response.status(200).send(version);
});

app.use(
  "/",
  expressStaticGzip(root, {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    serveStatic: {
      setHeaders: (res, path) => {
        if (staticFilesRegex.test(path)) {
          res.setHeader("Cache-Control", "max-age=15552000");
          return;
        }

        res.setHeader(
          "Cache-Control",
          "max-age=no-cache, no-store, must-revalidate"
        );
      },
    },
  })
);

app.use(
  fallback("index.html", {
    root,
    headers: { "Cache-Control": "max-age=no-cache, no-store, must-revalidate" },
  })
);

app.listen(port);

console.log(`Server started on port ${port}`);
