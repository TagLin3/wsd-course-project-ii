import * as userService from "../services/userService.js";

const userMiddleware = async (context, next) => {
  const user = await context.state.session.get("user");
  if (user) {
    context.user = await userService.getUserByEmail(user.email);
  }
  await next();
};

export { userMiddleware };
