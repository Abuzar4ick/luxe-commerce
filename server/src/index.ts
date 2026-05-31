import express from "express";
import path from "path";

import { ENV } from "./config/env.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (ENV.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});

export default app;
