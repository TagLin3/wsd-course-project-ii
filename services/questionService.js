import { sql } from "../database/database.js";

const listQuestionsForTopicById = async (topic_id) => {
  return await sql`SELECT * FROM questions WHERE topic_id=${topic_id}`;
};

const getQuestionById = async (id) => {
  const rows = await sql`SELECT * FROM questions WHERE id=${id}`;
  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
};

const getRandomQuestionByTopicId = async (topic_id) => {
  const rows = await sql`SELECT * FROM questions
  WHERE topic_id=${topic_id}
  ORDER BY RANDOM ()`;
  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
};

const getRandomQuestion = async () => {
  const rows = await sql`SELECT * FROM questions
  ORDER BY RANDOM ()`;
  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
};

const addQuestion = async (question_text, user_id, topic_id) => {
  await sql`INSERT INTO questions (question_text, user_id, topic_id)
  VALUES (${question_text} ,${user_id}, ${topic_id})`;
};

const deleteQuestionById = async (id) => {
  await sql`DELETE FROM questions WHERE id=${id}`;
};

const getTotalQuestionsAmount = async () => {
  return await sql`SELECT COUNT(*) FROM questions`;
};

export {
  addQuestion,
  deleteQuestionById,
  getQuestionById,
  getRandomQuestion,
  getRandomQuestionByTopicId,
  getTotalQuestionsAmount,
  listQuestionsForTopicById,
};
