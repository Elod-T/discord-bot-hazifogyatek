import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
class Botond {
  @Slash({ description: "a nagyfeju dagadék", name: "botond" })
  async botond(interaction: CommandInteraction) {
    const bitond = await interaction.client.users.fetch("695208670572838963");

    console.log(bitond);
  }
}
