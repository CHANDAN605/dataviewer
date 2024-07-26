import express from "express";
import databaseController from "../controllers/databaseController.js";

const router = express.Router();

router.get("/api/tableslist", databaseController.getTablesList);
router.get("/api/:tableName/columnsname", databaseController.getDataByColumn);
router.get("/api/tables/:tableName/columns", databaseController.getColumns);
router.get("/api/tables/:tableName", databaseController.getDataFromTable);

export default router;
