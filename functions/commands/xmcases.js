const lib = require('lib')({token: process.env.STDLIB_TOKEN});

const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('../../sheetsAPI/client_secret.json');
const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
const names = ['alejandro', 'roger', 'amec', 'dennis', 'rodrigo', 'emily', 'rebecca', 'carlos'];
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
  // if(true){

    var params = text.toLowerCase().split(" ");
    var d = new Date();

    //using Google Sheets API to fetch data from spreadsheet
    // Create a document object using the ID of the spreadsheet - obtained from its URL.
    var doc = new GoogleSpreadsheet('1TORc-LBrt3_oe3mK3j-arickBm01UcqZHhoDBdqo3SU');
    doc.useServiceAccountAuth(creds, function (err) {
      doc.getCells(2, function (err, cells) {

        cases = getCasesInfo(cells, params.find(isMonth));
        casesList = [];

        monthString = params.find(isMonth)? params.find(isMonth) : 'this month';
        ownerString = params.find(isSomeone)? params.find(isSomeone) : false;

        if(cases.length > 0) {

          cases.forEach(function(cases){
            if(!ownerString || ownerString == cases.owner.toLowerCase()){
              casesList.push({
                value: `*<${cases.link}|${cases.number}> (${cases.date})* - *${cases.description}* Owner: ${cases.owner} *Status: ${cases.status}* *<${cases.discussion}|Discussion>*`,
                short: true
              });
            }
          });

          callback(null, {
            response_type: 'ephemeral',
            "attachments": [
              {
                  "fallback": "What?",
                  "pretext": `Here are ${ownerString? '*' + ownerString.charAt(0).toUpperCase() + ownerString.slice(1) + '*\'s' : 'the'  } cases for *${ monthString }*:`,
                  "mrkdwn_in":["fields","pretext"],
                  "footer": "XMPie",
                  "footer_icon": "https://i.imgur.com/SaV1D9j.png",
                  "fields": casesList,
                  "color": "good"
              }
            ]
          });
        }
        else {
          callback(null, {
            response_type: 'ephemeral',
            text: `I can't find any cases that match.`
          })
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
  function getCasesInfo(data, month) {
    month = month ? month : months[d.getMonth()]
    result = [];
    for (var i = 0; i < data.length; i++) {
      if(data[i].col == 1 && data[i].row > 1 && data[i].value == month) {
        result.push({
          number : data[i+1] ? data[i+1].value : 'not provided',
          link : data[i+2] ? data[i+2].value : 'not provided',
          owner : data[i+3] ? data[i+3].value : 'not provided',
          status : data[i+4] ? data[i+4].value : 'not provided',
          description : data[i+5] ? data[i+5].value : 'not provided',
          date: data[i+6] ? data[i+6].value : 'not provided',
          discussion: data[i+7] ? data[i+7].value : `not provided`
        });
      }
    }
    return result;
  };

  function isMonth(someText) {
    someText = someText.toLowerCase();
    if(months.includes(someText)){
      return true;
    } else
      return false;
  }

  function isSomeone(someText) {
    someText = someText.toLowerCase();
    if(names.includes(someText)){
      return true;
    } else
    return false;
  }

};
