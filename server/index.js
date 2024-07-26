import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config/config.js";
import router from "./routes/route.js";
import { Connection } from "./database/db.js";
// import { Connection } from "./db/connection.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
const PORT = 8000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await Connection();
});
// Connection.sync({ alter: true })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });
