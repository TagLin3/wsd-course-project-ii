import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import * as answerService from "../../services/answerService.js";

const showMain = async ({ render }) => {
  const questionsRows = await questionService.getTotalQuestionsAmount();
  const topicsRows = await topicService.getTotalTopicsAmount();
  const answerRows = await answerService.getTotalAnswersAmount();
  const data = {
    questionsAmount: questionsRows[0].count,
    topicsAmount: topicsRows[0].count,
    answersAmount: answerRows[0].count,
  };
  render("main.eta", data);
};

export { showMain };
