import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const listTopics = async ({ render }) => {
  render("topics.eta", { topics: await topicService.listTopics() });
};

const addTopic = async ({ request, response, user, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const topicData = {
    name: params.get("name"),
  };
  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );
  if (!passes) {
    render("topics.eta", {
      topics: await topicService.listTopics(),
      validationErrors: errors,
      name: topicData.name,
    });
  } else {
    if (user.admin) {
      await topicService.addTopic(user.id, params.get("name"));
    }
    response.redirect("/topics");
  }
};

const deleteTopic = async ({ params, response, user }) => {
  if (user.admin) {
    await topicService.deleteTopicById(params.id);
  }
  response.redirect("/topics");
};

export { addTopic, deleteTopic, listTopics };
