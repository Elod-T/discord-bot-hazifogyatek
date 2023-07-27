import axios from "axios";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
class Bible {
  @Slash({ description: "A Zúr kegyelmébő", name: "bible" })
  bible(interaction: CommandInteraction) {
    axios
      .get("https://www.abibliadigital.com.br/api/verses/bbe/random", {
        headers: {
          Authorization: `Bearer ${process.env.BIBLE_API_KEY}`,
        },
      })
      .then((response) => {
        const color = Math.floor(Math.random() * 16777215).toString(16);

        const embed = new EmbedBuilder()
          .setTitle(
            `${response.data.book.name} ${response.data.chapter}:${response.data.number}`
          )
          .setAuthor({ name: response.data.book.group })
          .setColor(color as any)
          .setDescription(response.data.text)
          .setThumbnail(
            "https://w0.peakpx.com/wallpaper/58/538/HD-wallpaper-jesus-christ-jesus-christ-christian-god-religious-thumbnail.jpg"
          );

        interaction.reply({
          embeds: [embed],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
