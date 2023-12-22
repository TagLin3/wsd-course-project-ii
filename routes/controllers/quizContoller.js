import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as answerService from "../../services/answerService.js";

const listTopics = async ({ render }) => {
  render("quiz.eta", { topics: await topicService.listTopics() });
};

const newQuestion = async ({ response, params }) => {
  const question = await questionService.getRandomQuestionByTopicId(params.tId);
  if (question) {
    response.redirect(`/quiz/${params.tId}/questions/${question.id}`);
  } else {
    response.body = "No questions so far for this topic";
  }
};

const showQuestion = async ({ render, params }) => {
  render("askQuestion.eta", {
    topic: await topicService.getTopicById(params.tId),
    question: await questionService.getQuestionById(params.qId),
    options: await optionService.listOptionsForQuestionById(params.qId),
  });
};

const answerQuestion = async ({ response, params, user }) => {
  answerService.addAnswer(user.id, params.qId, params.oId);
  if (await optionService.checkOption(params.oId, params.qId)) {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
  } else {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
  }
};

const answeredCorrectly = ({ render, params }) => {
  render("answeredCorrectly.eta", { topicId: params.tId });
};

const answeredIncorrectly = async ({ render, params }) => {
  const correctOption = await optionService.getCorrectOption(params.qId);
  render("answeredIncorrectly.eta", {
    topicId: params.tId,
    correctOption: correctOption,
  });
};

export {
  answeredCorrectly,
  answeredIncorrectly,
  answerQuestion,
  listTopics,
  newQuestion,
  showQuestion,
};
