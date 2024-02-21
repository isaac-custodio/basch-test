import app from "./app";

import { createServer } from "http";
import { config } from "dotenv";
config();

const { PORT } = process.env;

if (!PORT) {
  throw new Error("PORT is missing in .env");
}

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
