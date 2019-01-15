var request = require('request');
var token = require('./secrets');
var fs = require('fs');
const args = process.argv;
[ignore, ignore1, owner, name] = args


function getRepoContributors(repoOwner, repoName, cb1) {
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

          err ? console.log(err) :  null;

          response ? console.log("Status code: " + response.statusCode) : null;

          if(body) {
            const parsed = JSON.parse(body)
            cb1(parsed)
          }
          });
  }

function loopThroughURLs(result, cb) {
    
    result.forEach(each => {
        let url = each.avatar_url
        let path = each.login
        cb(url, path)
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

  getRepoContributors(owner, name, function (data) {
    loopThroughURLs(data, downloadImageByURL)
  })

//   module.exports = 
//       getRepoContributors,
//       downloadImageByURL,
//       loopThroughURLs
//   }



  