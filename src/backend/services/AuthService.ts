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
					description: "Unauthorized",
					examples: ["Unauthorized"],
				}),
			},
			{
				title: "Unauthorized",
				description: "Unauthorized",
				examples: [
					{
						error: "Unauthorized",
					},
				],
			},
		),
	};
}

export class UnauthorizedError extends Error {
	status: number = StatusMap.Unauthorized;
	message = "Unauthorized";
	constructor() {
		super();
		this.name = "Unauthorized";
	}

	toResponse() {
		return Response.json(
			{
				error: this.message,
			},
			{
				status: this.status,
			},
		);
	}
}
