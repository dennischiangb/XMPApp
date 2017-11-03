const lib = require('lib')({token: process.env.STDLIB_TOKEN});

const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('../../sheetsAPI/client_secret.json');
const team = {
  dennis: 'U0545PDQ3',
  rodrigo: 'U0DU10LAU',
  roger: 'U75RRPETH',
  alejandro: 'U0408Q8R0',
  amec: 'U707X17U3',
  emily: 'U6XAQ854Y'
};

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

  if(Object.values(team).indexOf(user) > -1){

    //using Google Sheets API to fetch data from spreadsheet
    // Create a document object using the ID of the spreadsheet - obtained from its URL.
    var doc = new GoogleSpreadsheet('1TORc-LBrt3_oe3mK3j-arickBm01UcqZHhoDBdqo3SU');

    // Authenticate with the Google Spreadsheets API.
    doc.useServiceAccountAuth(creds, function (err) {
      // Get all of the cells from the spreadsheet.
      doc.getCells(3, function (err, cells) {
        //parse the info; see function definition for more


        commands = getCommandsInfo(cells);
        commandList = [];

        if(commands.length > 0) {
          commands.forEach(function(commands){
            commandList.push({
              title: commands.command,
              value: commands.explanation,
              short: true
            }) 
          });

          callback(null, {
            response_type: 'ephemeral',
            "attachments": [
              {
                  "fallback": "What?",
                  "pretext": "*Here are all of our commands:*",
                  "footer": "XMPie",
                  "ts": Date.now()/1000|0,
                  "footer_icon": "https://i.imgur.com/SaV1D9j.png",
                  "mrkdwn_in":["fields","pretext"],
                  "fields": commandList,
                  "color": "good"
              }
          ]
        });
        }    
      });
    });
  } else {
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

  //function to parse server login data recieved from google sheets
  function getCommandsInfo(data) {
    result = [];
    for (var i = 0; i < data.length; i++) {
      //start with the fisrt cell of each row; "data[i].row > 1" ignores the first row which is just labels
      if(data[i].col == 1 && data[i].row > 1) {
        /*
        * here we constrcuct a new object for each server
        * looks something like this:
        *
        * serverName : {
        *   ip: 192.168.168.168,
        *   user: username,
        *   password: password
        * }
        *
        */

        result.push({
          command : data[i] ? data[i].value : 'not provided',
          explanation : data[i+1] ? data[i+1].value : 'not provided'
        })
      }
    }
    return result;
  };


};
