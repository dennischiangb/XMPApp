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
  var team = {
    dennis: 'U0545PDQ3',
    rodrigo: 'U0DU10LAU',
    roger: 'U75RRPETH',
    alejandro: 'U0408Q8R0',
    amec: 'U707X17U3',
    emily: 'U6XAQ854Y'
  };

  var servers = {
    dennis: {
      ip: '192.168.19.171',
    },
    rodrigo: {
      ip: '192.168.19.167',
    },
    roger: {
      ip: '192.168.19.165',
    },
    alejandro: {
      ip: '192.168.19.164',
    },
    amec: {
      ip: '192.168.19.166',
    },
    emily: {
      ip: '192.168.19.168',
    }
  }

  if(Object.values(team).indexOf(user) > -1){

    callback(null, {
      response_type: 'ephemeral',
      "text": "New comic book alert!",
      "attachments": [
          {
              "title": "The Further Adventures of Slackbot",
              "fields": [
                  {
                      "title": "Volume",
                      "value": "1",
                      "short": true
                  },
                  {
                      "title": "Issue",
                      "value": "3",
                      "short": true
                  }
              ],
              "author_name": "Stanford S. Strickland",
              "author_icon": "http://a.slack-edge.com/7f18/img/api/homepage_custom_integrations-2x.png",
              "image_url": "http://i.imgur.com/OJkaVOI.jpg?1"
          },
          {
              "title": "Synopsis",
              "text": "After @episod pushed exciting changes to a devious new branch back in Issue 1, Slackbot notifies @don about an unexpected deploy..."
          },
          {
              "fallback": "Would you recommend it to customers?",
              "title": "Would you recommend it to customers?",
              "callback_id": "comic_1234_xyz",
              "color": "#3AA3E3",
              "attachment_type": "default",
              "actions": [
                  {
                      "name": "recommend",
                      "text": "Recommend",
                      "type": "button",
                      "value": "recommend"
                  },
                  {
                      "name": "no",
                      "text": "No",
                      "type": "button",
                      "value": "bad"
                  }
              ]
          }
      ]});
  }else{
    callback(err, {
      response_type: 'ephemeral',
      text: `Sorry, this command is unsupported in this channel.`
    });
  }


};