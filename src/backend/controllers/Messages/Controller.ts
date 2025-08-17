import { Elysia } from "elysia";
import { DiscordChatService } from "../../services/Discord/Chat";
import * as MessagesSchemas from "./Schemas";

const MessagesController = new Elysia({
	prefix: "/messages",
	detail: {
		tags: ["Messages"],
		description: "Send and edit messages to the user",
		security: [
			{
				headerAuth: [],
			},
		],
	},
})
	.post(
		"/",
		async ({ body, status }) => {
			try {
				const messageId = await DiscordChatService.sendMessage(body.message);
				return status(201, {
					success: true,
					messageId,
				});
			} catch (_) {
				return status(400, {
					success: false,
					error: "Unexpected error",
				});
			}
		},
		{
			body: MessagesSchemas.messageSendBodySchema,
			response: {
				201: MessagesSchemas.messageSendSucessSchema,
				400: MessagesSchemas.messageSendErrorSchema,
			},
			detail: {
				description: "Send a message to the user",
			},
		},
	)
	.post(
		"/:id",
		async ({ params, body, status }) => {
			try {
				await DiscordChatService.editMessage(params.id, body.message);
				return status(201, {
					success: true,
					messageId: params.id,
				});
			} catch (_) {
				return status(400, {
					success: false,
					error: "Unexpected error",
				});
			}
		},
		{
			body: MessagesSchemas.messageSendBodySchema,
			response: {
				201: MessagesSchemas.messageSendSucessSchema,
				400: MessagesSchemas.messageSendErrorSchema,
			},
			detail: {
				description: "Edit a message to the user",
			},
		},
	);

export default MessagesController;
