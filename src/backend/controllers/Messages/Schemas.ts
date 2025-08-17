import { t } from "elysia";

export const messageSendBodySchema = t.Object({
	message: t.String({
		minLength: 1,
	}),
});

export const messageSendSucessSchema = t.Object({
	success: t.Literal(true),
	messageId: t.String(),
});

export const messageSendErrorSchema = t.Object({
	success: t.Literal(false),
	error: t.String(),
});
