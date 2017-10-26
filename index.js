// aiml
AIMLInterpreter = require('./node_modules/aimlinterpreter/AIMLInterpreter');

var aimlInterpreter = new AIMLInterpreter({name:'Tam Nguyen', age:'23'});
aimlInterpreter.loadAIMLFilesIntoArray(['./aiml.xml']);


// Connect database
var mysql = require('mysql');

var conn = mysql.createConnection({
    host    : "45.117.169.92",
    user    : "dbquyen_travel",
    password: "Travelbot@123",
    database: "dbquyen_travelbot"
});

// messenger facebook
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
  res.send('Thiết lập webhook thành công!')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'tamnguyen') {
    res.send(req.query['hub.challenge'])
  } else {
    res.send('Error, wrong token')
  }
})

// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.FB_PAGE_ACCESS_TOKEN
const token = "EAABwygPtwy4BAPaOdoKNANZB9G3YZBmZAKclAWiZBXhZBy0J0ZCZBeRZAnyFi2ylRsPk4zcDw2UMrx1PrX3ysqvdORDJfaI6D60iwiujeiFU7CfTuykvi01YmpNu0mZChFpwphs5NcSnuvgNmiebxQzKN1EKoKQoXI7W2irkFzf9RE2XceCPvKAK3"

// bot reply when page has message
function sendTextMessage(sender, text) {
  let messageData = { text:text }
  
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

// send image
function sendImageMessage(sender){

  let messageData = {
    "attachment": {
      "type": "image",
      "payload": {
        "url": "https://raw.githubusercontent.com/ngtambt94/TravelBot/master/source/img/02.jpg"
      }
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  }) 
}

// send audio
function sendAudioMessage(sender){
  let messageData = {
    "attachment": {
      "type": "audio",
      "payload": {
        "url": "https://mp3.zing.vn/bai-hat/Em-Gai-Mua-Huong-Tram/ZW8IZECW.html"
      }
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  }) 
}

// send video
function sendVideoMessage(sender){
  let messageData = {
    "attachment": {
      "type": "video",
      "payload": {
        "url": "https://www.youtube.com/embed/I3u09JnVKTU"
      }
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  }) 
}

// menu help of bot
function sendGenericMessage(sender) {
  let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Menu giúp đỡ",
          "subtitle": "Đây là những điều mình có thể làm",
          "image_url": "http://i.imgur.com/648mzEV.jpg",
          "buttons": [{
            "type": "web_url",
            "url": "https://www.facebook.com/2TQ-Chatbot-173993989838993/",
            "title": "Ghé thăm fanpage"
          }, {
            "type": "postback",
            "title": "Postback",
            "payload": "Payload for first element in a generic bubble",
          }],
        }]
      }
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}


// chuyển đổi tiếng việt không dấu và loại bỏ dấu câu
function convert(str){
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/!|\?|\.|;|,/g, "");
  return str;
}


// to post data
app.post('/webhook', function (req, res) {
  let messaging_events = req.body.entry[0].messaging
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i]
    let sender = event.sender.id

    // kiểm tra sự kiện có tin nhắn đến
    if (event.message && event.message.text) {
      let text = event.message.text;
      let temp = "";
      for (var j = 0; j < text.length; j++) {
        temp += convert(text[j]);
      }
      // hàm callback trả về đáp án
      var callback = function(answer, wildCardArray, input){
        if (temp === 'image') {
            sendImageMessage(sender);
        }
        else if (answer !== undefined && answer !== '') {
            sendTextMessage(sender, answer);
        }
        // không tìm thấy đáp án         
        else{
          sendTextMessage(sender, "Xin lỗi! Mình chưa hiểu rõ ý của bạn. Vui lòng nhập help để biết mình có thể giúp gì cho bạn.");
        }
      };

      // kiểm tra text với file aiml
      aimlInterpreter.findAnswerInLoadedAIMLFiles(temp, callback)
    }
  }
  res.sendStatus(200)
})


// spin spin sugar
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'))
})
