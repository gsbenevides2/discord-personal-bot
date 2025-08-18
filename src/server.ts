import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { logger } from "@grotto/logysia";
import { Elysia } from "elysia";
import api from "./backend/api";
import { DiscordService } from "./backend/services/Discord";
import { coolifyHealthChecker } from "./plugins/coolify-healtcheker";
import { getProjectInfo } from "./utils/getProjectInfo";
import { sendServerReadyMessage } from "./utils/sendServerReadyMessage";

const port = Bun.env.PORT || 3000;
const projectInfo = getProjectInfo();

console.log(`${projectInfo.title} v${projectInfo.version}`);
console.log("Initializing Discord Service...");
await DiscordService.init();
console.log("Discord Service initialized");

const app = new Elysia()
	.use(
		logger({
			logIP: true,
			writer: {
				write(msg: string) {
					console.log(msg);
				},
			},
		}),
	)
	.use(cors())
	.use(
		swagger({
			documentation: {
				info: projectInfo,
				tags: [
					{
						name: "Messages",
						description: "Messages",
					},
				],
				components: {
					securitySchemes: {
						headerAuth: {
							type: "apiKey",
							in: "header",
							name: "Authorization",
							description: "Authentication token",
						},
					},
				},
			},
		}),
	)
	.use(coolifyHealthChecker)
	.use(api)
	.listen(port, sendServerReadyMessage);

export type App = typeof app;
