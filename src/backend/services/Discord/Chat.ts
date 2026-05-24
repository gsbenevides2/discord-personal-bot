import {
	ChannelType,
	type Message as DiscordJSMessage,
	type OmitPartialGroupDMChannel,
} from "discord.js";
import { getEnv } from "../../../utils/getEnv";
import { chatbotClient } from "../../clients/chatbot";
import { DiscordService } from ".";
import { DiscordAuthService } from "./Auth";

type Message = OmitPartialGroupDMChannel<DiscordJSMessage<boolean>>;

function getDiscordConfig() {
	return {
		DISCORD_BOT_ID: getEnv("DISCORD_BOT_ID"),
		DISCORD_ALLOWED_USER_ID: getEnv("DISCORD_ALLOWED_USER_ID"),
		DISCORD_TEXT_CHANNEL_ID: getEnv("DISCORD_TEXT_CHANNEL_ID"),
	};
}

export class DiscordChatService {
	static async receiveMessage(message: Message) {
		const { DISCORD_BOT_ID } = getDiscordConfig();
		if (message.author.id === DISCORD_BOT_ID) return;

		const isAllowed = await DiscordAuthService.verifyUser(message.author);
		if (!isAllowed) {
			message.reply("Você não tem permissão para usar este bot.");
			return;
		}

		const text = message.content;
		const imagesUrls = message.attachments
			.filter((attachment) => attachment.contentType?.startsWith("image/"))
			.map((attachment) => attachment.url);
		const audioUrl = message.attachments
			.filter((attachment) => attachment.contentType?.startsWith("audio/"))
			.first()?.url;

		const requetsBody = audioUrl
			? {
					audio: audioUrl,
				}
			: {
					message: text,
					images: imagesUrls,
				};

		chatbotClient.post("/api/chatbot/", requetsBody);
	}

	static async sendMessage(message: string) {
		const { DISCORD_ALLOWED_USER_ID } = getDiscordConfig();
		const user = await DiscordService.discordJSClient.users.fetch(
			DISCORD_ALLOWED_USER_ID,
		);
		const discordMessage = await user.send(message);
		return discordMessage.id;
	}

	static async editMessage(id: string, message: string) {
		const { DISCORD_TEXT_CHANNEL_ID } = getDiscordConfig();
		const channel = await DiscordService.discordJSClient.channels.fetch(
			DISCORD_TEXT_CHANNEL_ID,
		);
		if (!channel) {
			throw new Error("Channel not found");
		}
		if (channel.type !== ChannelType.DM) {
			throw new Error("Channel is not a DM");
		}
		await channel.messages.edit(id, {
			content: message,
		});
	}
}
