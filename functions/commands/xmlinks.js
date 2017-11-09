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
      "attachments": [
        {
            "fallback": "What?",
            "pretext": "*Useful links:*",
            "footer": "XMPie",
            "ts": Date.now()/1000|0,
            "footer_icon": "https://i.imgur.com/SaV1D9j.png",
            "mrkdwn_in":["fields","pretext"],
            "fields": [
                {
                    "value": `*<https://trello.com/b/VNOC5stG/xmpie-support|XMPie Support (Trello)>*`,
                    "short": true,
                },
                {
                  "value": "*<http://jira:8080/projects/BUG/summary|Jira (Bug Tracker)>* \nU: JViewer \nPW: JViewer",
                  "short": true
                },
                {
                  "value": "*<http://campus.xmpie.com/login.aspx?ReturnUrl=%2fdefault.aspx|XMPie Campus>* \nU: dennis@partnerhero.com \nPW: 0^-D]{f",
                  "short": true
                },
                {
                  "value": "*<http://help.xmpie.com/|XMPie Online Help>*",
                  "short": true
                },  
                {
                  "value": "*<https://na29.salesforce.com/_ui/knowledge/ui/KnowledgeHome/|Salesforce Knowledge Base>*",
                  "short": true
                },
                {
                  "value": "*<https://keys.xmpie.com/XMPieLicensing|License Status>* \nU: short username (e.g. dennisc) \nPW: xmpie domain pw",
                  "short": true
                },       
            ],
            "color": "good"
        }
    ]
  });
  }else{
    callback(null, {
      response_type: 'ephemeral',
      "attachments": [
        {
            "fallback": "Warning?",
            "text": "Sorry, this command is exclusive to the XMPie team.",
            "footer": "XMPie",
            "ts": Date.now()/1000|0,
            "footer_icon": "https://i.imgur.com/SaV1D9j.png",
            "mrkdwn_in":["pretext"],
            "color": "warning"
        }
    ]
    });
  }


};
