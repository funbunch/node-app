var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(request,response) {
    response.send('hi there');

});

app.listen(port, function(){
    console.log('Server is running on ' + port);

})