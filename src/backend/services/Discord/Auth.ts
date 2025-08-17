import type { User } from "discord.js";
import { getEnv } from "../../../utils/getEnv";

const ALLOWED_USER_ID = getEnv("DISCORD_ALLOWED_USER_ID");
export class DiscordAuthService {
	static async verifyUser(user: User) {
		return user.id === ALLOWED_USER_ID;
	}
}
