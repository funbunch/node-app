var express = require('express');
var app = express();
var templates = require('express-handlebars');
var port = process.env.PORT || 3000;

app.set('views', 'views');

app.engine('hbs', templates({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: './views/layouts'
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', function(request,response) {
    var favoriteShow = ['Saul', 'Walking Dead','Game of Thrones'];
    var favoriteLinks = [
        { text: "Facebook", url: 'http://facebook.com'},
        { text: "CNN", url: 'http://cnn.com'},
        { text: "ESPN", url: 'http://espn.com'}
      ];
    
    response.render('home', {
      title: 'home page',
      favorites: favoriteShow,
      links: favoriteLinks
  });
});

app.get('/projects', function(request,response) {
    response.render('newproject');
});

app.listen(port, function(){
    console.log('Server is running on ' + port);

});