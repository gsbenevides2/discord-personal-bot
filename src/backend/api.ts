import { Elysia, StatusMap } from "elysia";
import MessagesController from "./controllers/Messages/Controller";
import { AuthService } from "./services/AuthService";

const api = new Elysia({
	prefix: "/api",
})
	.onBeforeHandle(async ({ headers, status }) => {
		const token = headers?.authorization;
		if (!token) {
			return status(StatusMap["Unauthorized"], {
				error: "Missing Authorization header or invalid token",
			});
		}
		const decoded = await AuthService.verify(token);
		if (!decoded) {
			return status(StatusMap["Unauthorized"], {
				error: "Missing Authorization header or invalid token",
			});
		}
	})
	.use(MessagesController);

export default api;
