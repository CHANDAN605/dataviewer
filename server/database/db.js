import { PrismaClient } from "@prisma/client";
import config from "../config/config.js";

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
const prisma = new PrismaClient();
// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: `mysql://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`,
//     },
//   },
// });
export const Connection = async () => {
  try {
    await prisma.$connect();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default prisma;
