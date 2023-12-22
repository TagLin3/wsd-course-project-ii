import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const newQuestion = async ({ response }) => {
  const question = await questionService.getRandomQuestion();
  if (question) {
    const optionsFromDatabase = await optionService.listOptionsForQuestionById(
      question.id,
    );
    const options = [];
    optionsFromDatabase.forEach((option) => {
      const optionObj = {
        optionId: option.id,
        optionText: option.option_text,
      };
      options.push(optionObj);
    });
    const obj = {
      questionId: question.id,
      questionText: question.question_text,
      answerOptions: options,
    };
    response.body = obj;
  } else {
    response.body = {};
  }
};

const proccessAnswer = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  response.body = {
    correct: await optionService.checkOption(
      document.optionId,
      document.questionId,
    ),
  };
};

export { newQuestion, proccessAnswer };
