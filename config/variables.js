import "dotenv/config.js";

const PORT = Number(process.env.PORT);
const DATABASE_URL = String(process.env.DATABASE_URL);

export { PORT, DATABASE_URL };
