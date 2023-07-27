import axios from "axios";
import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
class ChuckNorris {
  @Slash({
    description: "A legenda, az egyetlen, a felülmúlhatatlan",
    name: "chucknorris",
  })
  chucknorris(interaction: CommandInteraction) {
    axios
      .get("https://api.chucknorris.io/jokes/random")
      .then((response) => {
        interaction.reply(response.data.value);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
