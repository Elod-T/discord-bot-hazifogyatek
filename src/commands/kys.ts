import {
  ApplicationCommandOptionType,
  CommandInteraction,
  GuildMember,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
class Kys {
  @Slash({ description: "kys", name: "kys" })
  kys(
    @SlashOption({
      description: "Kinek a kurva anyját?",
      name: "kicsoda",
      required: false,
      type: ApplicationCommandOptionType.User,
    })
    user: GuildMember["user"],
    interaction: CommandInteraction
  ) {
    if (!user) {
      return interaction.reply("https://www.youtube.com/watch?v=PayvWj2piKg");
    }

    interaction.reply(
      `<@${user.id}> https://www.youtube.com/watch?v=PayvWj2piKg`
    );
  }
}
