import express from "express";
import { registerRoutes } from "./routes";
import { createServer } from "http";

const app = express();

// Create a server instance (needed for registerRoutes to potentially attach WS, though unused currently)
// Note: In Vercel serverless environment, this server instance won't be listened on,
// but we pass it to registerRoutes to maintain compatibility.
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// Register routes
// We don't await here because we want to export the app synchronously if possible,
// but registerRoutes IS async.
// However, looking at registerRoutes implementation, it doesn't await anything critical for setup.
// But to be safe, we might need to handle this.
// In Vercel, top-level await is supported in modules.
// Let's modify this to export a function or just trust it.

// Since registerRoutes is async, we can't just run it at top level if we want 'app' to be fully ready immediately for commonjs.
// But we are in module mode ("type": "module" in package.json).

// We'll export the initialized app.
// Note: We need to make sure registerRoutes is called.
// We can wrap the export or just call it.
registerRoutes(httpServer, app);

export { app, httpServer };
