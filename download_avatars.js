var request = require('request');
var token = require('./secrets');
var fs = require('fs');


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
    
      request(options, function(err, response, body) {
          err ? console.log(err) : err = null;
          response ? console.log("Status code: " + response.statusCode) : null
          var parsed = JSON.parse(body)
        cb(err, parsed);
      });
  }

  function loopThroughURLs(err, result) {
    console.log("Errors:", err);
    result.forEach(each => {

        downloadImageByURL(each.avatar_url, each.login)

    })
  }

  function downloadImageByURL(url, filePath) {
     
    request.get(`${url}`)
    .on('error', function(err) {
        console.log(err)
    })
    .on('response', function(response) {
        console.log("Downloading...")
        // console.log(response.statusCode) // 200
        // console.log(response.statusMessage)
        // console.log(response.headers['content-type']) 
    })
    .pipe(fs.createWriteStream(`./avatars/${filePath}`))
    .on('finish', function () {
        console.log('Download finished.')
    })
  }

  module.exports = {
      getRepoContributors,
      downloadImageByURL,
      loopThroughURLs
  }

  getRepoContributors("jquery", "jquery", loopThroughURLs);
  