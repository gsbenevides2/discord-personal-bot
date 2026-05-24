import type { User } from "discord.js";
import { getEnv } from "../../../utils/getEnv";

export class DiscordAuthService {
	static async verifyUser(user: User) {
		const allowedUserId = getEnv("DISCORD_ALLOWED_USER_ID");
		return user.id === allowedUserId;
	}
}
