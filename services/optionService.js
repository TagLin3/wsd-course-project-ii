import { sql } from "../database/database.js";

const listOptionsForQuestionById = async (question_id) => {
  return await sql`SELECT * FROM question_answer_options WHERE question_id=${question_id}`;
};

const addOption = async (option_text, is_correct, question_id) => {
  await sql`INSERT INTO question_answer_options (option_text, is_correct, question_id) 
  VALUES (${option_text}, ${is_correct}, ${question_id})`;
};

const deleteOptionById = async (id) => {
  const answers =
    await sql`SELECT * FROM question_answers WHERE question_answer_option_id=${id}`;
  for (const answer of answers) {
    await sql`DELETE FROM question_answers WHERE id=${answer.id}`;
  }
  await sql`DELETE FROM question_answer_options WHERE id=${id}`;
};

const checkOption = async (option_id, question_id) => {
  const rows = await sql`SELECT * FROM question_answer_options
  WHERE id=${option_id} AND question_id=${question_id}`;
  return rows[0].is_correct;
};

const getCorrectOption = async (question_id) => {
  const rows = await sql`SELECT * FROM question_answer_options
  WHERE question_id=${question_id} AND is_correct=true`;
  return rows[0];
};

export {
  addOption,
  checkOption,
  deleteOptionById,
  getCorrectOption,
  listOptionsForQuestionById,
};
