import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const optionValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

const listOptions = async ({ render, params }) => {
  render("answerOptions.eta", {
    options: await optionService.listOptionsForQuestionById(params.qId),
    question: await questionService.getQuestionById(params.qId),
    topic: await topicService.getTopicById(params.id),
  });
};

const addOption = async ({ request, response, params, render }) => {
  const body = request.body({ type: "form" });
  const formParams = await body.value;
  const optionData = {
    option_text: formParams.get("option_text"),
  };
  const [passes, errors] = await validasaur.validate(
    optionData,
    optionValidationRules,
  );
  if (!passes) {
    render("answerOptions.eta", {
      options: await optionService.listOptionsForQuestionById(params.qId),
      question: await questionService.getQuestionById(params.qId),
      topic: await topicService.getTopicById(params.id),
      validationErrors: errors,
      option_text: optionData.option_text,
    });
  } else {
    await optionService.addOption(
      formParams.get("option_text"),
      formParams.has("is_correct"),
      params.qId,
    );
    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
  }
};

const deleteOption = async ({ response, params }) => {
  await optionService.deleteOptionById(params.oId);
  response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};

export { addOption, deleteOption, listOptions };
