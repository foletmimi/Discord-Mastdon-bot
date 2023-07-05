const rss = require('rss-parser');
const fs = require('fs');
const cron = require('node-cron');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { webhooks } = require(`${process.cwd()}/config/config.json`);
const { setTimeout } = require("timers/promises");

const rss_parse = new rss();
console.log("Discord-Mastodon-bot start up!");

cron.schedule('0,30 * * * * *', () => {
    rss_parse.parseURL('https://unnerv.jp/@UN_NERV.rss')
        .then(async(feed) => {
            var json = JSON.parse(fs.readFileSync(`${process.cwd()}/data/data.json`))
            var Url = json.URL
            var i = 0
            while (i < 10) {
                console.log(i)
                console.log(Url)
                const af_url = feed.items[i].link
                console.log(Url, af_url)
                if (Url == af_url) {
                    i = i - 1
                    break;
                };
                i = i + 1
            };
            console.log("next send")
            while (i > -1) {
                console.log(i)
                const af_url = feed.items[i].link
                console.log(af_url)
                if (Url == af_url) {
                    break;
                };
                await sendData(feed.items[i].contentSnippet, af_url, feed.items[i].enclosure)
                await setTimeout(1000);
                i = i - 1
            };
            await writeFile(feed.items[0].link)
        })
        .catch((error) => [
            console.error('RSS testing not clear', error)
        ])
})

function writeFile(data) {
    const jsonStr = JSON.stringify({ "URL": data }, null, 2);
    try {
        fs.writeFileSync(`${process.cwd()}/data/data.json`, jsonStr);
    } catch (er) {
        console.log(er)
    }
}

async function sendData(desc, link, encl) {
    await webhooks.forEach(wh => {
        var webhookClient = new WebhookClient({ url: wh })
        try {
            if (encl !== undefined) {
                const embed = new EmbedBuilder()
                    .setTitle('特務機関NERV (@UN_NERV@unnerv.jp)')
                    .setColor(16711680)
                    .setDescription(desc)
                    .setURL(link)
                    .setImage(encl.url)
                    .setAuthor({ name: "特務機関NERV", iconURL: "https://cdn.discordapp.com/attachments/465409938966183958/1104944254599581776/d53dd7b3255a6f46.png", url: "https://unnerv.jp/@UN_NERV" })
                const cont = {
                    username: "UN_NERV",
                    avatarURL: "https://cdn.discordapp.com/attachments/465409938966183958/1104944254599581776/d53dd7b3255a6f46.png",
                    embeds: [embed]
                }
                webhookClient.send(cont)
            } else {
                const embed = new EmbedBuilder()
                    .setTitle("特務機関NERV (@UN_NERVpunnerv.jp)")
                    .setColor(16711680)
                    .setDescription(desc)
                    .setURL(link)
                    .setAuthor({ name: "特務機関NERV", iconURL: "https://cdn.discordapp.com/attachments/465409938966183958/1104944254599581776/d53dd7b3255a6f46.png", url: "https://unnerv.jp/@UN_NERV" })
                const cont = {
                    username: "UN_NERV",
                    avatarURL: "https://cdn.discordapp.com/attachments/465409938966183958/1104944254599581776/d53dd7b3255a6f46.png",
                    embeds: [embed]
                }
                webhookClient.send(cont)
            }
        } catch (e) {
            console.error(e)
        }
    })
}