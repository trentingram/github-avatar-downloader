const getFunction = require('./download_avatars');

const getContributors = getFunction.getRepoContributors
const writeJPGsToFile = getFunction.downloadImageByURL
const getURLs = getFunction.loopThroughURLs

function downloadImageByURL(url, filePath) {
downloadImageByURL(each.avatar_url, each.login)




const repo = {
    repoOwner: 'jquery',
    repoName: 'jquery'
}

getContributors(repo.repoOwner, repo.repoOwner, function (parsedData) {
getURLs(parsedData, function (url, filePath) {
    writeJPGsToFile(url, filePath)
 })
})
}
