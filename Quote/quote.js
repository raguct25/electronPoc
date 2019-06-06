const request =require('request');

// request("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(err, response, body){
//   let bodyJson = JSON.parse(body);
//   console.log('bodyJson', bodyJson);
//   let randomQuote = bodyJson[0]["content"];
//   console.log('randomQuote', randomQuote);
//   document.getElementById('idQuote').innerHTML= randomQuote;
// })

setInterval(function(){
  request("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(err, response, body){
    let bodyJson = JSON.parse(body);
    console.log('bodyJson', bodyJson);
    let randomQuote = bodyJson[0]["content"];
    console.log('randomQuote', randomQuote);
    document.getElementById('idQuote').innerHTML= randomQuote;
  });
}, 5000);
