const { Client, Events, GatewayIntentBits, ActionRowBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.on("ready", () => {
    channel = client.channels.cache.get("1098709522937282632")
    setInterval(async () => {
        data = await getData("TSLA");
        console.log(data)
        channel.send("@everyone CODE: TSLA; PRICE: " + data.price)
    }, 2000);  
    
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);

async function getData(stockName){
    const options = {
        method: 'GET',
        url: `https://realstonks.p.rapidapi.com/${stockName}`,
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '0c03f8d51amshf6c0690fd1dcc80p1f3392jsn8e5ba72d15fd',
          'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return response.data;
      } catch (error) {
          console.error(error);
      }
}