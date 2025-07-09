const express = require("express");
const {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Events,
} = require("discord.js");
require("dotenv").config();

// Tambahkan Express agar bisa diping dari UptimeRobot
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot Discord is alive!");
});

app.listen(PORT, () => {
  console.log(`Web server aktif di http://localhost:${PORT}`);
});

// Bot Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  console.log(`Bot ready sebagai ${client.user.tag}`);
});

// Saat user kirim command "!update", bot kirim pesan dengan tombol
client.on("messageCreate", async (message) => {
  if (message.content === "!update") {
    const button = new ButtonBuilder()
      .setCustomId("btn_update")
      .setLabel("Update ke DB")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await message.reply({
      content: "Klik tombol ini untuk update:",
      components: [row],
    });
  }
});

// Saat tombol diklik
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "btn_update") {
    await interaction.reply({
      content: `Tombol diklik oleh ${interaction.user.username}. (Akan sambung ke API nanti)`,
      ephemeral: true,
    });

    // Di sini bisa ditambahkan axios POST ke API kamu
  }
});

client.login(process.env.DISCORD_TOKEN);
