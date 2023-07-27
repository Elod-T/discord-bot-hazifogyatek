import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import axios, { AxiosResponse } from "axios";

interface ISSResponse extends AxiosResponse {
  data: {
    iss_position: {
      latitude: number;
      longitude: number;
    };
    timestamp: number;
    message: "success" | "failure";
  };
}

@Discord()
class ISS {
  @Slash({ description: "Hol van az ISS?", name: "iss" })
  async iss(interaction: CommandInteraction) {
    axios
      .get("http://api.open-notify.org/iss-now.json")
      .then((response: ISSResponse) => {
        interaction.reply(
          `Az ISS jelen pillanatban a következő koordinátákon van: ${response.data.iss_position.latitude}, ${response.data.iss_position.longitude}`
        );
      })
      .catch((error) => {
        interaction.reply("Itt valami bűzlik...");
      });
  }
}
