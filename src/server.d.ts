declare module "utils/getEnv" {
    export function getEnv(key: string, required?: boolean, defaultValue?: string): string;
}
declare module "backend/services/Discord/index" {
    import { Client as DiscordJSClient } from "discord.js";
    export class DiscordService {
        static discordJSClient: DiscordJSClient;
        static init(): void;
        static setupEventHandlers(): void;
        static connect(): Promise<unknown>;
    }
}
declare module "backend/services/Discord/Auth" {
    import type { User } from "discord.js";
    export class DiscordAuthService {
        static verifyUser(user: User): Promise<boolean>;
    }
}
declare module "backend/services/Discord/Chat" {
    import { type Message as DiscordJSMessage, type OmitPartialGroupDMChannel } from "discord.js";
    type Message = OmitPartialGroupDMChannel<DiscordJSMessage<boolean>>;
    export class DiscordChatService {
        static receiveMessage(message: Message): Promise<void>;
        static sendMessage(message: string): Promise<string>;
        static editMessage(id: string, message: string): Promise<void>;
    }
}
declare module "backend/controllers/Messages/Schemas" {
    export const messageSendBodySchema: import("@sinclair/typebox").TObject<{
        message: import("@sinclair/typebox").TString;
    }>;
    export const messageSendSucessSchema: import("@sinclair/typebox").TObject<{
        success: import("@sinclair/typebox").TLiteral<true>;
        messageId: import("@sinclair/typebox").TString;
    }>;
    export const messageSendErrorSchema: import("@sinclair/typebox").TObject<{
        success: import("@sinclair/typebox").TLiteral<false>;
        error: import("@sinclair/typebox").TString;
    }>;
}
declare module "backend/controllers/Messages/Controller" {
    import { Elysia } from "elysia";
    const MessagesController: Elysia<"/messages", {
        decorator: {};
        store: {};
        derive: {};
        resolve: {};
    }, {
        typebox: {};
        error: {};
    }, {
        schema: {};
        standaloneSchema: {};
        macro: {};
        macroFn: {};
        parser: {};
    }, {
        messages: {
            post: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: never;
                    201: {
                        readonly success: true;
                        readonly messageId: string;
                    };
                    400: {
                        readonly success: false;
                        readonly error: "Unexpected error";
                    };
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    } & {
        messages: {
            ":id": {
                post: {
                    body: unknown;
                    params: {
                        id: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: never;
                        201: {
                            readonly success: true;
                            readonly messageId: string;
                        };
                        400: {
                            readonly success: false;
                            readonly error: "Unexpected error";
                        };
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    }, {
        derive: {};
        resolve: {};
        schema: {};
        standaloneSchema: {};
    }, {
        derive: {};
        resolve: {};
        schema: {};
        standaloneSchema: {};
    }>;
    export default MessagesController;
}
declare module "backend/services/AuthService" {
    export class AuthService {
        static verify(secret: string): Promise<boolean>;
    }
}
declare module "backend/api" {
    import { Elysia } from "elysia";
    const api: Elysia<"/api", {
        decorator: {};
        store: {};
        derive: {};
        resolve: {};
    }, {
        typebox: {};
        error: {};
    }, {
        schema: {};
        standaloneSchema: {};
        macro: {};
        macroFn: {};
        parser: {};
    }, {
        api: {
            messages: {
                post: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: never;
                        201: {
                            readonly success: true;
                            readonly messageId: string;
                        };
                        400: {
                            readonly success: false;
                            readonly error: "Unexpected error";
                        };
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        } & {
            messages: {
                ":id": {
                    post: {
                        body: unknown;
                        params: {
                            id: string;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: never;
                            201: {
                                readonly success: true;
                                readonly messageId: string;
                            };
                            400: {
                                readonly success: false;
                                readonly error: "Unexpected error";
                            };
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    }, {
        derive: {};
        resolve: {};
        schema: {};
        standaloneSchema: {};
    }, {
        derive: {};
        resolve: {};
        schema: {};
        standaloneSchema: {};
    }>;
    export default api;
}
declare module "plugins/coolify-healtcheker/index" {
    import { Elysia } from "elysia";
    export const coolifyHealthChecker: Elysia<"", {
        decorator: {};
        store: {};
        derive: {};
        resolve: {};
    }, {
        typebox: {};
        error: {};
    }, {
        schema: {};
        standaloneSchema: {};
        macro: {};
        macroFn: {};
        parser: {};
    }, {
        health: {
            get: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: string;
                };
            };
        };
    }, {
        derive: {};
        resolve: {};
        schema: {};
        standaloneSchema: {};
    }, {
        derive: {};
        resolve: {};
        schema: {};
        standaloneSchema: {};
    }>;
}
declare module "utils/getProjectInfo" {
    export const getProjectName: () => any;
    export const getProjectInfo: () => {
        title: any;
        description: any;
        version: any;
        contact: {
            name: any;
            email: any;
            url: any;
        };
        license: {
            url: string;
            name: any;
        };
    };
}
declare module "utils/sendServerReadyMessage" {
    export const sendServerReadyMessage: (server: Bun.Server) => void;
}
declare module "server" {
    import { Elysia } from "elysia";
    const app: Elysia<"", {
        decorator: {};
        store: {};
        derive: {};
        resolve: {};
    }, {
        typebox: {};
        error: {};
    }, {
        schema: {};
        standaloneSchema: {};
        macro: {};
        macroFn: {};
        parser: {};
    }, {
        health: {
            get: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: string;
                };
            };
        };
    } & {
        api: {
            messages: {
                post: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: never;
                        201: {
                            readonly success: true;
                            readonly messageId: string;
                        };
                        400: {
                            readonly success: false;
                            readonly error: "Unexpected error";
                        };
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        } & {
            messages: {
                ":id": {
                    post: {
                        body: unknown;
                        params: {
                            id: string;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: never;
                            201: {
                                readonly success: true;
                                readonly messageId: string;
                            };
                            400: {
                                readonly success: false;
                                readonly error: "Unexpected error";
                            };
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    }, {
        derive: {};
        resolve: {};
        schema: {};
        standaloneSchema: {};
    }, {
        derive: {};
        resolve: {};
        schema: {};
        standaloneSchema: {};
    }>;
    export type App = typeof app;
}
