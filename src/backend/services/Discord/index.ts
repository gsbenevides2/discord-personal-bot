import {
	Client as DiscordJSClient,
	GatewayIntentBits,
	Partials,
	type Message as DiscordJSMessage,
} from "discord.js";
import { getEnv } from "../../../utils/getEnv";
import { DiscordChatService } from "./Chat";

function isDiscordReadEnabled() {
	const raw = getEnv("DISCORD_READ", false, "false");
	return ["1", "true", "yes", "on"].includes(raw.trim().toLowerCase());
}

export class DiscordService {
	static discordJSClient: DiscordJSClient = new DiscordJSClient({
		intents: [
			GatewayIntentBits.MessageContent,
			GatewayIntentBits.DirectMessages,
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildVoiceStates,
		],
		partials: [Partials.Channel, Partials.Message],
	});

	static init() {
		DiscordService.setupEventHandlers();
		if (!isDiscordReadEnabled()) return;
		DiscordService.connect();
	}

	static setupEventHandlers() {
		DiscordService.discordJSClient.on(
			"messageCreate",
			(message: DiscordJSMessage<boolean>) => {
				if (!isDiscordReadEnabled()) return;
				DiscordChatService.receiveMessage(message);
			},
		);
	}

	static connect() {
		const DISCORD_TOKEN = getEnv("DISCORD_TOKEN");
		return new Promise((resolve, reject) => {
			const readyListener = () => {
				DiscordService.discordJSClient.removeListener("ready", readyListener);
				resolve(true);
			};
			DiscordService.discordJSClient.addListener("ready", readyListener);
			DiscordService.discordJSClient.login(DISCORD_TOKEN).catch(reject);
		});
	}
}
