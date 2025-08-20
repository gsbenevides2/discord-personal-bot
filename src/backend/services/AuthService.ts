import { StatusMap, t } from "elysia";
import { getEnv } from "../../utils/getEnv";

const AUTH_SECRET = getEnv("AUTH_SECRET");

export class AuthService {
	static async verify(secret: string) {
		return secret === AUTH_SECRET;
	}

	static commomSchema = {
		[StatusMap["Unauthorized"]]: t.Object(
			{
				error: t.String({
					description: "Missing Authorization header or invalid token",
					examples: ["Missing Authorization header or invalid token"],
				}),
			},
			{
				title: "Unauthorized",
				description: "Unauthorized",
				examples: [
					{
						error: "Missing Authorization header or invalid token",
					},
				],
			},
		),
	};
}
