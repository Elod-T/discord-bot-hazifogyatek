import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
class Hello {
  @Slash({ description: "Pong!", name: "ping" })
  hello(interaction: CommandInteraction) {
    interaction.reply(
      `Pong! Latency: ${
        new Date().getTime() - new Date(interaction.createdTimestamp).getTime()
      } ms`
    );
  }
}
