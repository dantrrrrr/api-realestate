import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Real Estate API",
      version: "1.0.0",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer",
      },
      servers: [`http://localhost:${process.env.PORT}`],
    },
  },
  apis: ["./routes/*.js"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
