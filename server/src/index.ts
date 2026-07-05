import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

import { ENV } from "./config/env.js";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// Body parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

if (ENV.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.use(errorHandler);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
