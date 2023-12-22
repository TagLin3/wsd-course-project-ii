import { sql } from "../database/database.js";

const listTopics = async () => {
  return await sql`SELECT * FROM topics ORDER BY name`;
};

const getTopicById = async (id) => {
  const rows = await sql`SELECT * FROM topics WHERE id=${id}`;
  return rows[0];
};

const addTopic = async (user_id, name) => {
  await sql`INSERT INTO topics (user_id, name) VALUES (${user_id}, ${name})`;
};

const deleteTopicById = async (id) => {
  const questions = await sql`SELECT * FROM questions WHERE topic_id=${id}`;
  for (const question of questions) {
    await sql`DELETE FROM question_answers WHERE question_id=${question.id}`;
    await sql`DELETE FROM question_answer_options WHERE question_id=${question.id}`;
  }
  await sql`DELETE FROM questions WHERE topic_id=${id}`;
  await sql`DELETE FROM topics WHERE id=${id}`;
};

const getTotalTopicsAmount = async () => {
  return await sql`SELECT COUNT(*) FROM topics`;
};

export {
  addTopic,
  deleteTopicById,
  getTopicById,
  getTotalTopicsAmount,
  listTopics,
};
