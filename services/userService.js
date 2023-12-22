import { sql } from "../database/database.js";

const addUser = async (email, password, admin) => {
  await sql`INSERT INTO users (email, password, admin)
  VALUES (${email}, ${password}, ${admin})`;
};

const getUserByEmail = async (email) => {
  const rows = await sql`SELECT * FROM users WHERE (email=${email})`;
  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
};

export { addUser, getUserByEmail };
