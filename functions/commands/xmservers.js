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
      ip: '192.6-168.19.164',
    },
    amec: {
      ip: '192.168.19.166',
    },
    emily: {
      ip: '192.168.19.168',
    }
  }

  if(Object.values(team).indexOf(user) > -1){

    if(team[text]) {
      callback(null, {
        response_type: 'ephemeral',
        text: `Hey <@${user}> here is the info for ${text}'s sever:`,
        attachments: [
          {
            fallback: `Hey <@${user}>, good luck`,
            title: servers[text].ip,
            text: 'Login:'
            color: "#6f6a9d",
            fields: [
              {
                title: 'User',
                value: 'xmpieadmin',
                short: true
              }
              {
                title: 'Password',
                value: 'RainbowTrout330',
                short: true
              }
            [
          },
        ]
      });
    } else {
      callback(null, {
        response_type: 'ephemeral',
        text: `Sorry <@${user}> I don't know about the ${text} sever`
      });
    }
  } else {
    callback(null, {
      response_type: 'ephemeral',
      text: `Sorry, this command is exclusive to the XMPie team.`
    });
  }


};
