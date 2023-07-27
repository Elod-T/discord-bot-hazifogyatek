import axios from "axios";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
class NumberFact {
  @Slash({
    description: "Ezt ki tudja? És ki a faszomat érdekel?",
    name: "numberfact",
  })
  numberFact(
    @SlashOption({
      description: "A szám, amiről a tényt szeretnéd tudni",
      name: "num",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    num: number,
    interaction: CommandInteraction
  ) {
    axios
      .get(`http://numbersapi.com/${num}`)
      .then((response) => {
        interaction.reply(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
