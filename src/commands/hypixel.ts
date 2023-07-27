import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  CommandInteraction,
  MessageActionRowComponentBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { Discord, SelectMenuComponent, Slash, SlashOption } from "discordx";
import Hypixel from "hypixel-api-reborn";

const hypixel = new Hypixel.Client(process.env.HYPIXEL_API_KEY!);

function getChoices(
  gamemodes:
    | "skywars"
    | "bedwars"
    | "uhc"
    | "speeduhc"
    | "murdermystery"
    | "duels"
    | "buildbattle"
    | "megawalls"
    | "copsandcrims"
    | "tntgames"
    | "smashheroes"
    | "vampirez"
    | "blitzsg"
    | "arena"
    | "paintball"
    | "quakecraft"
    | "turbokartracers"
    | "walls"
    | "warlords"
    | "arcade"
): any {
  switch (gamemodes) {
    case "bedwars":
      return {
        solo: ["normal"],
        doubles: ["normal", "ultimate", "rush", "armed", "lucky", "voidless"],
        threes: ["normal"],
        fours: [
          "normal",
          "4v4",
          "ultimate",
          "rush",
          "armed",
          "lucky",
          "voidless",
        ],
        castle: ["normal"],
      };
  }
}

@Discord()
class HypixelCommand {
  player: Hypixel.Player | undefined = undefined;
  teamsize = "";

  @Slash({ description: "Hypixel api 100% veszely", name: "hypixel" })
  async hypixel(
    @SlashOption({
      description: "Minecraft username",
      name: "username",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    user: string,
    interaction: CommandInteraction
  ) {
    hypixel.getPlayer(user).then((player) => {
      interaction.reply(
        `**${player.nickname}**'s stats:
            **Rank**: ${player.rank}
            **Level**: ${player.level}
            **Karma**: ${player.karma}
            **Experience**: ${player.totalExperience}
            **First Login**: ${new Date(player.firstLogin).toLocaleString()}
            **Last Login**: ${new Date(player.lastLogin!).toLocaleString()}
            **Achievement Points**: ${player.achievementPoints}
        `
      );
    });
  }
  gamemodes = [
    { label: "skywars", value: "skywars" },
    { label: "bedwars", value: "bedwars" },
    { label: "uhc", value: "uhc" },
    { label: "speeduhc", value: "speeduhc" },
    { label: "murdermystery", value: "murdermystery" },
    { label: "duels", value: "duels" },
    { label: "buildbattle", value: "buildbattle" },
    { label: "megawalls", value: "megawalls" },
    { label: "copsandcrims", value: "copsandcrims" },
    { label: "tntgames", value: "tntgames" },
    { label: "smashheroes", value: "smashheroes" },
    { label: "vampirez", value: "vampirez" },
    { label: "blitzsg", value: "blitzsg" },
    { label: "arena", value: "arenabrawl" },
    { label: "paintball", value: "paintball" },
    { label: "quakecraft", value: "quakecraft" },
    { label: "turbokartracers", value: "turbokartracers" },
    { label: "walls", value: "walls" },
    { label: "warlords", value: "warlords" },
    { label: "arcade", value: "arcade" },
  ];

  @Slash({ description: "hypixel stats", name: "stats" })
  async stats(
    @SlashOption({
      description: "Minecraft username",
      name: "username",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    user: string,
    interaction: CommandInteraction
  ): Promise<void> {
    await interaction.deferReply();

    this.player = await hypixel.getPlayer(user);

    const gamemode = new StringSelectMenuBuilder()
      .addOptions(this.gamemodes)
      .setCustomId("gamemode-menu");

    const buttonRow =
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        gamemode
      );

    interaction.editReply({
      components: [buttonRow],
      content: `Játékos: ${this.player.nickname}
      Válszd ki a játékmódot!`,
    });

    setTimeout(() => {
      interaction.deleteReply();
    }, 10000);
  }

  @SelectMenuComponent({ id: "gamemode-menu" })
  async gamemode(interaction: StringSelectMenuInteraction): Promise<unknown> {
    await interaction.deferReply();

    const gamemodeValue = interaction.values?.[0];

    if (!gamemodeValue) {
      return interaction.followUp("Nem választottál ki semmit!");
    }

    const teamsizes = Object.keys(getChoices(gamemodeValue as any));

    const teamsize = new StringSelectMenuBuilder()
      .addOptions(
        teamsizes.map((t) => {
          return { label: t, value: t };
        })
      )
      .setCustomId("bedwars-teamsize-menu");

    const buttonRow =
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        teamsize
      );

    interaction.followUp({
      components: [buttonRow],
      content: `Játékos: ${this.player?.nickname}
      Válaszd ki a csapat méretet!`,
    });

    setTimeout(() => {
      interaction.deleteReply();
    }, 10000);
  }

  @SelectMenuComponent({ id: "bedwars-teamsize-menu" })
  async teamsizeSelector(
    interaction: StringSelectMenuInteraction
  ): Promise<unknown> {
    await interaction.deferReply();

    const teamSizeValue = interaction.values?.[0];

    if (!teamSizeValue) {
      return interaction.followUp("Nem választottál ki semmit!");
    }

    this.teamsize = teamSizeValue;

    const modes = getChoices("bedwars")[teamSizeValue];

    const mode = new StringSelectMenuBuilder()
      .addOptions(
        modes.map((t: any) => {
          return { label: t, value: t };
        })
      )
      .setCustomId("bedwars-mode-menu");

    const buttonRow =
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        mode
      );

    interaction.followUp({
      components: [buttonRow],
      content: `Játékos: ${this.player?.nickname}
      Válaszd ki a módot!`,
    });

    setTimeout(() => {
      interaction.deleteReply();
    }, 10000);
  }

  @SelectMenuComponent({ id: "bedwars-mode-menu" })
  async modeSelector(
    interaction: StringSelectMenuInteraction
  ): Promise<unknown> {
    await interaction.deferReply();

    const modeValue = interaction.values?.[0];

    if (!modeValue) {
      return interaction.followUp("Nem választottál ki semmit!");
    }

    let stats;
    if (
      modeValue == "ultimate" ||
      modeValue == "rush" ||
      modeValue == "armed" ||
      modeValue == "lucky" ||
      modeValue == "voidless"
    ) {
      stats = (this.player?.stats?.bedwars as any).dream[modeValue][
        this.teamsize
      ];
    } else if (modeValue == "normal") {
      stats = (this.player?.stats?.bedwars as any)[this.teamsize];
    } else {
      stats = (this.player?.stats?.bedwars as any)[modeValue][this.teamsize];
    }

    interaction.followUp(`**${
      this.player?.nickname
    }**'s stats for **${modeValue}** in **${this.teamsize}**:

            **Wins**: ${stats.wins}
            **Losses**: ${stats.losses}
            **W/L**: ${(stats.wins / stats.losses).toFixed(2)}
            **Kills**: ${stats.kills}
            **Deaths**: ${stats.deaths}
            **K/D**: ${(stats.kills / stats.deaths).toFixed(2)}
            **Final Kills**: ${stats.finalKills}
            **Final Deaths**: ${stats.finalDeaths}
            **Final K/D**: ${(stats.finalKills / stats.finalDeaths).toFixed(2)}
            **Beds Broken**: ${stats.beds.broken}
            **Beds Lost**: ${stats.beds.lost}
            **Beds B/L**: ${(stats.beds.broken / stats.beds.lost).toFixed(2)}
          `);
  }
}
