import prisma from "../database/db.js";
export const getTablesList = async (req, res) => {
  try {
    const dbName = process.env.DB_NAME;

    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = ${dbName}
    `;

    res.json(tables.map((table) => table.table_name));
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Error fetching tables" });
  }
};

export const getColumns = async (req, res) => {
  const { tableName } = req.params;

  try {
    // Directly use the database name from environment variables
    const dbName = process.env.DB_NAME;

    // Query to get column names from the information_schema
    const columns = await prisma.$queryRaw`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = ${dbName} AND table_name = ${tableName}
    `;

    // Map over the results to extract column names
    res.json(columns.map((column) => column.column_name));
  } catch (error) {
    console.error("Error fetching columns:", error);
    res.status(500).json({ error: "Error fetching columns" });
  }
};
const handleBigIntSerialization = (data) => {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};
export const getDataFromTable = async (req, res) => {
  const { tableName } = req.params;
  try {
    console.log("tableName", tableName);
    // Query to get all data from the specified table
    const data = await prisma.$queryRawUnsafe(`
      SELECT * FROM ${tableName}
    `);

    const serializedData = handleBigIntSerialization(data);

    res.json(serializedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};
export const getDataByColumn = async (req, res) => {
  const { tableName } = req.params;
  const { columns } = req.query;
  try {
    if (!columns) {
      return res.status(400).json({ error: "No columns provided" });
    }

    // Construct the SQL query with the specified columns
    const columnNames = columns
      .split(",")
      .map((col) => col.trim())
      .join(", ");
    // Query to get data from the specified column in the table
    const data = await prisma.$queryRawUnsafe(`
      SELECT ${columnNames}
      FROM ${tableName}
    `);

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};
export default {
  getColumns,
  getTablesList,
  getDataByColumn,
  getDataFromTable,
};
