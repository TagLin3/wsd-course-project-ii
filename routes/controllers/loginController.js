import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const showLoginForm = ({ render }) => {
  render("login.eta");
};

const login = async ({ request, response, render, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const user = await userService.getUserByEmail(params.get("email"));
  if (!user) {
    render("login.eta", { failedLogin: true });
    return;
  }
  const passwordCorrect = await bcrypt.compare(
    params.get("password"),
    user.password,
  );
  if (!passwordCorrect) {
    render("login.eta", { failedLogin: true });
    return;
  }
  state.session.set("user", user);
  response.redirect("/topics");
};

export { login, showLoginForm };
