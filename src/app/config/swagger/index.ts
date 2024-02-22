import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi, { SwaggerOptions } from "swagger-ui-express";

const { PORT } = process.env;

if (!PORT) {
  throw new Error("PORT not provided in .env");
}

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Documentaçao API Basch Test",
      description: "Documentação da API",
      contact: {
        name: "Isaac Custodio",
      },
      version: "1.0.0",
      servers: ["http://localhost:" + PORT],
    },
  },
  apis: [
    "src/app/index.ts",
    "src/routes/*.ts",
    "src/app/config/swagger/schemas/*.ts",
  ],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
