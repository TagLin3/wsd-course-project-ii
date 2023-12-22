import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionContoller from "./controllers/optionController.js";
import * as registerController from "./controllers/registerController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizContoller.js";
import * as quizApi from "./apis/quizApi.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);
router.get("/topics/:id", questionController.listQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);
router.get("/topics/:id/questions/:qId", optionContoller.listOptions);
router.post("/topics/:id/questions/:qId", optionContoller.addOption);
router.post(
  "/topics/:id/questions/:qId/delete",
  questionController.deleteQuestion,
);
router.post(
  "/topics/:id/questions/:qId/options/:oId/delete",
  optionContoller.deleteOption,
);
router.get("/auth/register", registerController.showRegistrationForm);
router.post("/auth/register", registerController.register);
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.login);
router.get("/quiz", quizController.listTopics);
router.get("/quiz/:tId", quizController.newQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.showQuestion);
router.post(
  "/quiz/:tId/questions/:qId/options/:oId",
  quizController.answerQuestion,
);
router.get(
  "/quiz/:tId/questions/:qId/correct",
  quizController.answeredCorrectly,
);
router.get(
  "/quiz/:tId/questions/:qId/incorrect",
  quizController.answeredIncorrectly,
);
router.get("/api/questions/random", quizApi.newQuestion);
router.post("/api/questions/answer", quizApi.proccessAnswer);
export { router };
