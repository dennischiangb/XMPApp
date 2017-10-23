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
      "text": "Would you like to play a game?",
      "attachments": [
          {
              "text": "Choose a game to play",
              "fallback": "You are unable to choose a game",
              "callback_id": "wopr_game",
              "color": "#3AA3E3",
              "attachment_type": "default",
              "actions": [
                  {
                      "name": "game",
                      "text": "Chess",
                      "type": "button",
                      "value": "chess"
                  },
                  {
                      "name": "game",
                      "text": "Falken's Maze",
                      "type": "button",
                      "value": "maze"
                  },
                  {
                      "name": "game",
                      "text": "Thermonuclear War",
                      "style": "danger",
                      "type": "button",
                      "value": "war",
                      "confirm": {
                          "title": "Are you sure?",
                          "text": "Wouldn't you prefer a good game of chess?",
                          "ok_text": "Yes",
                          "dismiss_text": "No"
                      }
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