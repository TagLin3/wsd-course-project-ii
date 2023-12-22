import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";
import { validasaur } from "../../deps.js";

const userValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const showRegistrationForm = ({ render }) => {
  render("register.eta");
};

const register = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const userData = {
    email: params.get("email"),
    password: params.get("password"),
  };
  const [passes, errors] = await validasaur.validate(
    userData,
    userValidationRules,
  );
  if (!passes) {
    render("register.eta", {
      validationErrors: errors,
      email: userData.email,
      password: userData.password,
    });
  } else {
    await userService.addUser(
      params.get("email"),
      await bcrypt.hash(params.get("password")),
      false,
    );
    response.redirect("/auth/login");
  }
};

export { register, showRegistrationForm };
