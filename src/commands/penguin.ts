import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import fs from "fs";

@Discord()
class Penguin {
  @Slash({ description: "Borzasztó pingvin mémek", name: "pingvin" })
  penguin(interaction: CommandInteraction) {
    const images = fs.readdirSync("./src/assets/penguins");
    const randomImage = images[Math.floor(Math.random() * images.length)];

    interaction.reply({
      files: [`./src/assets/penguins/${randomImage}`],
    });
  }
}
