var request = require('request');
var token = require('./secrets');
console.log(token.GITHUB_TOKEN)
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
        headers: {
          'User-Agent': 'request'
        },
        'auth': {
            'user': 'trentingram',
            'pass': token.GITHUB_TOKEN
          }
      };
    
      request(options, function(err, res, body) {
          var parsed = JSON.parse(body)
        cb(err, parsed);
      });
  }



  getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    result.forEach(each => console.log(each.avatar_url))
  });
  