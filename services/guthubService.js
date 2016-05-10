var axios = require('axios');
require('dotenv').config();

var githubService = function() {
        var options = {
        headers: {
            'User-Agent': 'funbunch',
            Authorization: 'token ' + process.env.GITHUB_TOKEN
        }
    };
    
    function getBio() {
        return axios.get('https://api.github.com/users/funbunch',options);
    }
    
    return {
        getBio: getBio
    };
};

module.exports = githubService();