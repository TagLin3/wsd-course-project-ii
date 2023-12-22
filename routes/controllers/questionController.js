import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const listQuestions = async ({ render, params }) => {
  render("questions.eta", {
    topic: await topicService.getTopicById(params.id),
    questions: await questionService.listQuestionsForTopicById(params.id),
  });
};

const addQuestion = async ({ request, response, params, user, render }) => {
  const body = request.body({ type: "form" });
  const formParams = await body.value;
  const questionData = {
    question_text: formParams.get("question_text"),
  };
  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );
  if (!passes) {
    render("questions.eta", {
      topic: await topicService.getTopicById(params.id),
      questions: await questionService.listQuestionsForTopicById(params.id),
      validationErrors: errors,
      question_text: questionData.question_text,
    });
  } else {
    await questionService.addQuestion(
      formParams.get("question_text"),
      user.id,
      params.id,
    );
    response.redirect(`/topics/${params.id}`);
  }
};

const deleteQuestion = async ({ response, params }) => {
  await questionService.deleteQuestionById(params.qId);
  response.redirect(`/topics/${params.id}`);
};

export { addQuestion, deleteQuestion, listQuestions };
