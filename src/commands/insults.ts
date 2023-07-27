import {
  ApplicationCommandOptionType,
  CommandInteraction,
  GuildMember,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import axios, { AxiosResponse } from "axios";

interface InsultResponse extends AxiosResponse {
  data: string;
}

@Discord()
class Insult {
  @Slash({ description: "Senkit sem kímél", name: "insult" })
  async insult(
    @SlashOption({
      description: "Kinek a kurva anyját?",
      name: "kit",
      required: false,
      type: ApplicationCommandOptionType.User,
    })
    member: GuildMember,
    interaction: CommandInteraction
  ) {
    const params = { who: member.user.username };

    axios
      .get("https://insult.mattbas.org/api/insult", {
        params,
      })
      .then((response: InsultResponse) => {
        interaction.reply(response.data);
      })
      .catch((error) => {
        interaction.reply("Itt valami bűzlik...");
      });
  }
}
