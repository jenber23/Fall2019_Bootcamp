//Jennifer Bernal
//Bootcamp1

var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

/*
  function(request, response)
https://www.w3schools.com/nodejs/met_http_createserver.asp
  writeHead(200,{content-type...:json})
  write(data or string)
  end

  */

  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
      format: fs.readfile(fileName,[options/flag], callback)
        where callback uses error + data
*/
fs.readFile('listings.json', 'utf8', 
    function(err, data) 
    {
      //Check for errors
      if(err) 
      {
        console.log("Error thrown.")
        throw err;
      }
      else // otherwise store the data into the global variable
        listingData = data;

      //create server through http
      //call requestHandle variable function for request/response
    server = http.createServer(requestHandler);
    //start server
    server.listen(port); //where port is any arbitrary num
    console.log("Server started.")

  } 
);

var requestHandler = function(request, response) 
{
  var parsedUrl = url.parse(request.url);

  if (request.method == 'GET' && parsedUrl.pathname == '/listings') 
  {   
    //send data, code 200, use JSON
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(listingData);
    console.log("Response and data sent.")
  }
  else 
  {
    //Send error text specified if not a data not properly handled
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write("Bad gateway error");
  }
  response.end();
};