import { resolve } from "node:path";
import { $ } from "bun";
import { getEnv } from "../../utils/getEnv";

const packageDir = resolve(import.meta.dirname, "..", "..", "..");
// chatbot
const chatbotClientDir = resolve(
	packageDir,
	"src",
	"backend",
	"clients",
	"chatbot",
);
const chatbotClientTypesFile = resolve(chatbotClientDir, "types.d.ts");
const chatbotUrl = new URL("/swagger/json", getEnv("CHATBOT_SERVICE_ENDPOINT"));

await $`openapi-typescript ${chatbotUrl.toString()} -o ${chatbotClientTypesFile}`;
