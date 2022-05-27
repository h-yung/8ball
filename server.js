const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')
/**add separate module? */

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;

  const params = querystring.parse(url.parse(req.url).query);  //update?

  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('subject' in params){
      // if (params['question']==="papa%johns"){

      if (params['subject'].includes('papa%20johns')){
        res.writeHead(200, {'Content-Type': 'application/json'});
        /*** */
        const objToJson = {
          subject: "papa johns",  //check against main.js input value formatting
          status: "not Dominos",
          verdict: ["Have nothing to do with it!"],
        }
        res.end(JSON.stringify(objToJson));
      }//question = papa johns
      // else if(params['subject'] !=="papa%20johns"){
      else if(!params['subject'].includes('papa%20johns')){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          subject: "",  
          status: "",
          verdict: [  //low-key way to create randomization potential
          "Bet.",
          "Signs point to yes.",
          "Most likely!",
          "Do a pomodoro and ask again.",
          "Sources say no.",
          "Very doubtful...",
          "Outlook not so good.",
          "Have nothing to do with it!"
        ]
        }
        res.end(JSON.stringify(objToJson));
      }//question != papa johns
    }//question if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);



