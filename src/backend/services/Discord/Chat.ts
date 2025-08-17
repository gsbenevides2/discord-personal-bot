import {
	ChannelType,
	type Message as DiscordJSMessage,
	type OmitPartialGroupDMChannel,
} from "discord.js";
import { getEnv } from "../../../utils/getEnv";
import { DiscordService } from ".";
import { DiscordAuthService } from "./Auth";

type Message = OmitPartialGroupDMChannel<DiscordJSMessage<boolean>>;

const DISCORD_BOT_ID = getEnv("DISCORD_BOT_ID");
const DISCORD_ALLOWED_USER_ID = getEnv("DISCORD_ALLOWED_USER_ID");
const DISCORD_TEXT_CHANNEL_ID = getEnv("DISCORD_TEXT_CHANNEL_ID");

export class DiscordChatService {
	static async receiveMessage(message: Message) {
		if (message.author.id === DISCORD_BOT_ID) return;
		const isAllowed = await DiscordAuthService.verifyUser(message.author);
		if (!isAllowed) {
			message.reply("Você não tem permissão para usar este bot.");
			return;
		}

		message.reply("Você tem permissão para usar este bot.");
	}

	static async sendMessage(message: string) {
		const user = await DiscordService.discordJSClient.users.fetch(
			DISCORD_ALLOWED_USER_ID,
		);
		const discordMessage = await user.send(message);
		return discordMessage.id;
	}

	static async editMessage(id: string, message: string) {
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
