const rss = require('rss-parser');
const fs = require('fs');
const cron = require('node-cron');
const axios = require('axios');
const { webhook }= require(`${process.cwd()}/config/config.json`);

const rss_parse = new rss();

const config = {
  "Accept": 'application/json',
  "Content-type": 'application/json'
}

console.log("Discord-Mastodon-bot start up!")

cron.schedule('0,30 * * * * *', () => {  rss_parse.parseURL('https://unnerv.jp/@UN_NERV.rss')
  .then(async (feed) => {
    //var { URL } = require(`${process.cwd()}/data/data.json`)
    var json = JSON.parse(fs.readFileSync(`${process.cwd()}/data/data.json`))
    var Url = json.URL
    let i = 0
    while ( i < 10 ) {
      console.log(i)
      console.log(Url)
      const af_url = feed.items[i].link
      if( Url !== af_url ) {
        console.log(Url, af_url)
        const content = {
          "username": "UN_NERV",
          "avatar_url": "https://cdn.discordapp.com/attachments/465409938966183958/1104944254599581776/d53dd7b3255a6f46.png",
          "content": af_url
        }
        await axios.post(webhook,content,config);
      }
      if(Url == af_url){
        break;
      }
      i = i + 1
    }
   await writeFile(feed.items[0].link)
})
.catch((error) => [
  console.log('RSS testing not clear', error)
])})


 function writeFile(data) {
  const jsonStr = JSON.stringify({"URL": data}, null, 2);
   try{fs.writeFileSync(`${process.cwd()}/data/data.json`, jsonStr);
   // console.log('Jsonの更新が成功');
   // console.log(data);
  }
   catch(er){
     console.log(er)
   }
}