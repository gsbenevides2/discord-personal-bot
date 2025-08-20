import { Elysia, StatusMap, t } from "elysia";
import { AuthService } from "../../services/AuthService";
import { DiscordChatService } from "../../services/Discord/Chat";

const MessagesController = new Elysia({
	prefix: "/messages",
	detail: {
		tags: ["Messages"],
		description: "Send and Edit Messages",
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
				return status(StatusMap["Created"], {
					messageId,
				});
			} catch (_) {
				return status(StatusMap["Bad Request"], {
					error: "Unexpected error",
				});
			}
		},
		{
			body: t.Object(
				{
					message: t.String({
						title: "Text message",
						description: "Text message to be sent",
						examples: ["Hello, how are you?", "How are you doing?"],
						minLength: 1,
					}),
				},
				{
					title: "Message",
					description: "Message to be sent",
					examples: [
						{
							message: "Hello, how are you?",
						},
					],
				},
			),
			response: {
				[StatusMap["Created"]]: t.Object(
					{
						messageId: t.String({
							title: "Discord Message ID",
							description:
								"Discord Message ID generated after sending the message",
							examples: ["1234567890"],
						}),
					},
					{
						title: "Message",
						description: "Message to be sent",
						examples: [
							{
								message: "Hello, how are you?",
							},
						],
					},
				),
				[StatusMap["Bad Request"]]: t.Object(
					{
						error: t.String({
							description: "Error message",
							title: "Error message",
							examples: ["You do not have permission to use this bot."],
						}),
					},
					{
						title: "Error",
						description: "Error message",
						examples: [
							{
								error: "You do not have permission to use this bot.",
							},
						],
					},
				),
				...AuthService.commomSchema,
			},
			detail: {
				summary: "Send Message",
				description: "Send a message to the user",
			},
		},
	)
	.post(
		"/:messageId",
		async ({ params, body, status }) => {
			try {
				await DiscordChatService.editMessage(params.messageId, body.message);
				return status(StatusMap["No Content"], "Message edited");
			} catch (_) {
				return status(StatusMap["Bad Request"], {
					error: "Unexpected error",
				});
			}
		},
		{
			params: t.Object({
				messageId: t.String({
					title: "Discord Message ID",
					description: "Discord Message ID",
					examples: ["1234567890"],
				}),
			}),
			body: t.Object({
				message: t.String({
					title: "Text message",
					description: "Text message that will replace the original message",
					examples: ["Hello, how are you?", "How are you doing?"],
					minLength: 1,
				}),
			}),
			response: {
				[StatusMap["No Content"]]: t.String({
					title: "Success message",
					description: "Success message",
					examples: ["Message edited"],
				}),
				[StatusMap["Bad Request"]]: t.Object(
					{
						error: t.String({
							title: "Error message",
							description: "Error message",
							examples: ["You do not have permission to use this bot."],
						}),
					},
					{
						title: "Error",
						description: "Error message",
						examples: [
							{
								error: "You do not have permission to use this bot.",
							},
						],
					},
				),
				...AuthService.commomSchema,
			},
			detail: {
				summary: "Edit Message",
				description: "Edit a specific sended message",
			},
		},
	);

export default MessagesController;
