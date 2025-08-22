import { Elysia } from "elysia";
import MessagesController from "./controllers/Messages/Controller";
import { AuthService, UnauthorizedError } from "./services/AuthService";

const api = new Elysia({
	prefix: "/api",
})
	.onBeforeHandle(async ({ headers }) => {
		const token = headers?.authorization;
		if (!token) {
			throw new UnauthorizedError();
		}
		const decoded = await AuthService.verify(token);
		if (!decoded) {
			throw new UnauthorizedError();
		}
	})
	.use(MessagesController);

export default api;
