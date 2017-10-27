AIMLInterpreter = require('./node_modules/aimlinterpreter/AIMLInterpreter');

var aimlInterpreter = new AIMLInterpreter({name:'Tam Nguyen', age:'23'});
aimlInterpreter.loadAIMLFilesIntoArray(['./aiml.xml']);

var mysql = require('mysql');

var conn = mysql.createConnection({
  host    : "45.117.169.92",
  user    : "dbquyen_travel",
  password: "Travelbot@123",
  database: "dbquyen_travelbot"
});

// var conn = mysql.createConnection({
//     host    : '185.27.134.10',
//     user    : 'b24_20917246',
//     password: 'ngochan94',
//     database: 'b24_20917246_tourdb'
// });

var x = [];
conn.connect(function (err){
    //nếu có nỗi thì in ra
    if (err) throw err.stack;
    //nếu thành công
    var sql = "select food_ten, food_diachi, food_hinhanh from foods, localfoods where foods.food_id = localfoods.food_id and place_id = 11 limit 0, 5";
//     conn.query(sql, function (err,results, fields) {
//         // if (err) throw err;
//         var x = "" + results[0]['food_ten'];
//         console.log(x);
//         // for (var i = 0; i < results.length; i++) {
//         //   console.log(i);
//         // }
//     });
// });

      conn.query(sql, function (err,results, fields) {
        let x = [{
          "title": results[0]['food_ten'],
          "subtitle": results[0]['food_diachi'],
          "image_url": "https://raw.githubusercontent.com/ngtambt94/TravelBot/master/source/img/" + results[0]['food_hinhanh'],
        }, {
          "title": results[1]['food_ten'],
          "subtitle": results[1]['food_diachi'],
          "image_url": "https://raw.githubusercontent.com/ngtambt94/TravelBot/master/source/img/" + results[1]['food_hinhanh'],
        }];
        return x;
      });
    });
    console.log(x);

// var callback = function(answer, wildCardArray, input){
//     // console.log(answer);
//     b(answer)
//     // return answer;
//     // console.log('ok');
//     // return answer;
// };

// function b(answer){
// 	console.log(answer)
// }

// function convert(str){
//   str = str.toLowerCase();
//   str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//   str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//   str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//   str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//   str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//   str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//   str = str.replace(/đ/g, "d");
//   str = str.replace(/!|\?|\.|;|,/g, "");
//   return str;
// }

// // var x = "cần thơ dkjbvjk dbsvkjds địa điểm";
// var r = ""
// // console.log(r);
// // console.log(reply);
// // var y = aimlInterpreter.findAnswerInLoadedAIMLFiles(x, callback);
// // var z = y
// // var y = aimlInterpreter.findAnswerInLoadedAIMLFiles(x, callback);
// // console.log(y);

// x = "đ!?,.;";
// for (var i = 0; i < x.length; i++) {
//   r += convert(x[i]);
// }
// console.log(r);


// // Test bot attributes
// aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your name?', callback);

// // Test setting and getting variable values
// aimlInterpreter.findAnswerInLoadedAIMLFiles('My name is Ben.', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('What is my name?', callback);

// // Test srai tag
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Who are you?', callback);

// // Test random tag
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Give me a letter.', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Test srai in random.', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Test wildcard What is my name?', callback);

// // Test sr tag
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Test sr tag', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Test sr in random', callback);

// // Test star tag
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Test the star tag', callback);


// // Test that tag
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Test the that tag', callback)
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Test that-tag. match',callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Test that-tag. dont match', callback);

// // Test condition tag
// aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your feeling today?', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('How are you feeling today?', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Tell me about your feelings', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles("You feel crumpy", callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your feeling today?', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles("You feel happy", callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('How are you feeling today?', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your feeling today?', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Tell me about your feelings', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles("You feel sad", callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('How are you feeling today?', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your feeling today?', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Tell me about your feelings', callback);

// // Test wildcards
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Explain HANA', callback);

// // Test finding nothing
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Test the wildcard pattern!', callback);