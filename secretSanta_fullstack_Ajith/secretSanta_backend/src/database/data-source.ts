import { DataSource } from "typeorm";
import { Employee } from "../entity/Employee"; // Import your entity
import * as dotenv from "dotenv";

// Load .env file
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",   // Get values from the .env file
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_NAME || "your_database",
  entities: [Employee],  // Add all your entities here
  synchronize: true,     // Sync schema with the database, useful for development
  logging: false,
});
console.log(process.env.DB_PASSWORD);
