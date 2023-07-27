import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import fs from "fs";

@Discord()
class Gancsos {
  @Slash({ description: "Áné idézetek", name: "gancsos" })
  gancsos(interaction: CommandInteraction) {
    const images = fs.readdirSync("./src/assets/gancsos");
    const randomImage = images[Math.floor(Math.random() * images.length)];

    interaction.reply({
      files: [`./src/assets/gancsos/${randomImage}`],
    });
  }
}
