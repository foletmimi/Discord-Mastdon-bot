const rss = require('rss-parser');
const fs = require('fs');
const cron = require('node-cron');
const { WebhookClient } = require('discord.js');
const { webhooks } = require(`${process.cwd()}/config/config.json`);
const { setTimeout } = require("timers/promises");

const rss_parse = new rss();
console.log("Discord-Mastodon-bot start up!")

cron.schedule('0,30 * * * * *', () => {
    rss_parse.parseURL('https://unnerv.jp/@UN_NERV.rss')
        .then(async(feed) => {
            var json = JSON.parse(fs.readFileSync(`${process.cwd()}/data/data2.json`))
            var Url = json.URL
            console.log(Url)
            let i = 0
            while (i < 10) {
                console.log(i)
                const af_url = feed.items[i].link
                if (Url == af_url) {
                    i = i - 1
                    break;
                }
                i = i + 1
            }

            while (i > -1) {
                const af_url = feed.items[i].link
                if (Url == af_url) {
                    break;
                }
                console.log(i)
                console.log(af_url)
                await sendData(af_url)
                await setTimeout(1000)
                i = i - 1
            }
            await writeFile(feed.items[0].link)
        })
        .catch((error) => [
            console.log('RSS testing not clear', error)
        ])
})


function writeFile(data) {
    const jsonStr = JSON.stringify({ "URL": data }, null, 2);
    try {
        fs.writeFileSync(`${process.cwd()}/data/data2.json`, jsonStr);
    } catch (er) {
        console.log(er)
    }
}

async function sendData(link) {
    await webhooks.forEach(wh => {
        var webhookClient = new WebhookClient({ url: wh })
        try {
            const cont = {
                username: "UN_NERV",
                avatarUrl: "https://cdn.discordapp.com/attachments/465409938966183958/1104944254599581776/d53dd7b3255a6f46.png",
                content: `${link}`
            }
            webhookClient.send(cont)
        } catch (e) {
            console.error(e)
        }
    })
}