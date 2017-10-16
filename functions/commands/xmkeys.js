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
  }


  if(Object.values(team).indexOf(user) > -1){
    callback(null, {
      response_type: 'ephemeral',
      text: `Hey <@${user}>this is your license key for ${text}:`
    });
  }else{
    callback(null, {
      response_type: 'ephemeral',
      text: `Sorry, this command is exclusive to the XMPie team.`
    });
  }


};
