import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import fs from "fs";

@Discord()
class Selfie {
  @Slash({ description: "Forró szelfik", name: "selfie" })
  selfie(interaction: CommandInteraction) {
    const images = fs.readdirSync("./src/assets/selfie");
    const randomImage = images[Math.floor(Math.random() * images.length)];

    interaction.reply({
      files: [`./src/assets/selfie/${randomImage}`],
    });
  }
}
