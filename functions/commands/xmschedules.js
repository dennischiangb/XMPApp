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

    const slack = require('slack');

    slack.chat.postMessage({
     token: botToken,
     channel: "channel",
     text: 'Respond to this',
     response_type: "ephemeral",
     attachments: [{
       text: 'Here is the action:',
       actions: [
         {
           name: 'example',
           text: 'Press me',
           type: 'button'
         }
       ]
     }]
    }, (err, result) => {
      callback(err, {
        response_type: 'ephemeral',
        text: botToken,
      });
    });

  //   callback(null, {
  //     response_type: 'ephemeral',
  //     "text": "Would you like to play a game?",
  //     "attachments": [
  //       {
  //         "text": "Choose a game to play",
  //         "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
  //         "color": "#3AA3E3",
  //         "attachment_type": "default",
  //         "callback_id": "game_selection",
  //         "actions": [
  //             {
  //                 "name": "games_list",
  //                 "text": "Pick a game...",
  //                 "type": "select",
  //                 "options": [
  //                     {
  //                         "text": "Hearts",
  //                         "value": "hearts"
  //                     },
  //                     {
  //                         "text": "Bridge",
  //                         "value": "bridge"
  //                     },
  //                     {
  //                         "text": "Checkers",
  //                         "value": "checkers"
  //                     },
  //                     {
  //                         "name": "chess",
  //                         "text": "Chess",
  //                         "value": "chess"
  //                     },
  //                     {
  //                         "text": "Poker",
  //                         "value": "poker"
  //                     },
  //                     {
  //                         "text": "Falken's Maze",
  //                         "value": "maze"
  //                     },
  //                     {
  //                         "text": "Global Thermonuclear War",
  //                         "value": "war"
  //                     }
  //                 ]
  //             }
  //         ]
  //     }
  // ]});
  }else{
    callback(null, {
      response_type: 'ephemeral',
      text: `Sorry, this command is unsupported in this channel.`
    });
  }


};
