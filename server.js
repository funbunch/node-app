var express = require('express');
var app = express();
var templates = require('express-handlebars');
var axios = require('axios');
var port = process.env.PORT || 3000;
var githubService = require('./services/githubService.js');
var projectInfoService = require('./services/projectInfoService.js');
var moment = require('moment');

app.set('views', 'views');

app.engine('hbs', templates({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: './views/layouts',
  helpers: {
      json:function(context) {
          return JSON.stringify(context);
      },
      formatDate: function(date, format) {
          return moment(date).format(format);
      }
  }
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
    githubService.githubInfo()
    .then(function(results){
        var repos = results.repos;
        repos.forEach(function(repo, index) {
            repos[index].hasPost = projectInfoService.fileExists(repo.name);
        });
            
        response.render('projects',
         {
            title: 'My Projects', 
            bio:results.bio,
            repos: results.repos
            
            }
     );
    })
    .catch(function (err) {
        console.log('err: ', err);
    });
});

app.get('/projects/:id', function(request, response) {
    var currentProjectName = request.params.id;
    var currentProject = {};
    
    projectInfoService.readFile(currentProjectName, function(err, results){
        if(err) {
         currentProject = {
            post: currentProjectName + 'is invalid'
         };   
        }  else {
           currentProject = {
               name: currentProjectName,
               post:results,
               url: 'https://github.com/funbunch/' + currentProjectName
               
        };  
    }
    response.render('project',
        {
            title: 'My Projects' + currentProjectName,
            project: currentProject
        }
    
        );
    });
});

app.get('/books', function(request,response) {
    var myBooks = [
        {text: "Luckiest Girl Alive", url: 'http://www.amazon.com/gp/product/1476789649/ref=s9_simh_bw_p14_d0_i2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-3&pf_rd_r=0M19844YXVX4RV50XQJB&pf_rd_t=101&pf_rd_p=2394961222&pf_rd_i=283155', author:'Jessica Knoll'},
        {text: "Clean Code", url: 'http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/ref=sr_1_1?s=books&ie=UTF8&qid=1462679682&sr=1-1&keywords=clean+code', author:'Robert Martin'},
        {text: "The Girl on the Train", url: 'http://www.amazon.com/Girl-Train-Paula-Hawkins/dp/1594633665?ie=UTF8&redirect=true&ref_=nav_signin', author:'Paula Martin'}
        ];
    response.render('books', {
        books: myBooks
    });
 });
    

app.listen(port, function(){
    console.log('Server is running on ' + port);

});