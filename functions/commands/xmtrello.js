const lib = require('lib')({token: process.env.STDLIB_TOKEN});

/**
* /hello
*
*   Basic "Hello World" command.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {

  if(channel == 'G76SVCPEV'){
    callback(null, {
      response_type: 'ephemeral',
      "attachments": [
        {
            /**"fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "pretext": "I got you, fam",
            "author_name": "XMPie Trello",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "https://i.imgur.com/SaV1D9j.png",
            "title": "XMPie Support",
            "title_link": "https://trello.com/b/VNOC5stG/xmpie-support",
            "text": "General XMPie Help",
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "XMPie",
            "footer_icon": "https://i.imgur.com/SaV1D9j.png",
            "ts": 123456789*/
            "fallback": "ReferenceError - UI is not defined: https://honeybadger.io/path/to/event/",
            "text": "I got you, fam",
            "footer": "XMPie",
            "ts": Date.time(),
            "footer_icon": "https://i.imgur.com/SaV1D9j.png",
            "fields": [
                {
                    "title": "XMPie Support",
                    "value": "https://trello.com/b/VNOC5stG/xmpie-support",
                    "short": true
                },
                {
                    "title": "Salesforce Cases",
                    "value": "https://trello.com/b/GDeLCYTO/salesforce-cases",
                    "short": true
                }
            ],
            "color": "#008000"
            
        }
    ]});
  }else{
    callback(null, {
      response_type: 'ephemeral',
      text: `Sorry, this command is unsupported in this channel.`
    });
  }


};
