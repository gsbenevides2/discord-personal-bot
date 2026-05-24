# Discord Bot

Microservice to manage to my personal discord bot.

## Setup

```bash
bun install
bun prepare
```

## Environment variables

- `DISCORD_READ` (optional)
  - Controla se o bot **processa** mensagens recebidas do Discord.
  - Valores aceitos: `true/false`, `1/0`, `yes/no`, `on/off`.
  - Padrão: `false`.

Quando `DISCORD_READ=false`, o service não faz login/conecta para leitura e não processa `messageCreate`.

## Notes

Endpoints do backend (`POST /api/messages/*`) continuam funcionando normalmente, mesmo com `DISCORD_READ=false`.
