import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
class Sex {
  @Slash({ description: "I know what sex is...", name: "sex" })
  sex(interaction: CommandInteraction) {
    interaction.reply("https://youtu.be/6TFsZiODx5A");
  }
}
