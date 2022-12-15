export const appConstants = {
  port: process.env.PORT,
  connectionString: process.env.DB_HOST,
  missingFieldsError: "Missing required fields",
  notFoundError: "Not found",
  swaggerUrl: "/api",
  swaggerJSON: "/api-json",
  healthPathDescription: "Path for cheking app health",
};
