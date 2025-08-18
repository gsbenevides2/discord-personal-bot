import {
	Client as DiscordJSClient,
	GatewayIntentBits,
	Partials,
} from "discord.js";
import { getEnv } from "../../../utils/getEnv";
import { DiscordChatService } from "./Chat";

const DISCORD_TOKEN = getEnv("DISCORD_TOKEN");

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
		DiscordService.connect();
	}

	static setupEventHandlers() {
		// DiscordService.discordJSClient.on("ready", () => {
		// 	console.log("Discord client is ready");
		// });

		DiscordService.discordJSClient.on("messageCreate", (message) => {
			DiscordChatService.receiveMessage(message);
		});
	}

	static connect() {
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
