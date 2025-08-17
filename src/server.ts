import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { logger } from "@grotto/logysia";
import { Elysia } from "elysia";
import api from "./backend/api";
import { DiscordService } from "./backend/services/Discord";
import { coolifyHealthChecker } from "./plugins/coolify-healtcheker";

const port = Bun.env.PORT || 3000;

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
				info: {
					title: "Discord Bot",
					version: "1.0.0",
					description: "Discord Bot",
				},
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
	.listen(port, () => {
		DiscordService.init();
		console.log(`Server is running on http://localhost:${port}`);
	});

export type App = typeof app;
