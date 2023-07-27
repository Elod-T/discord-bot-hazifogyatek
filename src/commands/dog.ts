import axios from "axios";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
class Dog {
  @Slash({ description: "dawg", name: "dog" })
  dog(interaction: CommandInteraction) {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        const embed = new EmbedBuilder()
          .setTitle("what the dawg doin?!")
          .setImage(response.data.message);

        interaction.reply({
          embeds: [embed],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
