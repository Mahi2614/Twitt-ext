// Fetch the analyzed tweets from storage
chrome.storage.local.get(['analyzedTweets'], function (result) {
  const tweetsDiv = document.getElementById('tweets')
  const tweets = result.analyzedTweets

  if (tweets) {
    tweets.forEach((tweetData) => {
      const tweetElement = document.createElement('div')
      tweetElement.textContent = `Tweet: ${tweetData.tweet} - Sentiment: ${tweetData.sentiment.score}`
      tweetsDiv.appendChild(tweetElement)
    })
  } else {
    tweetsDiv.textContent = 'No tweets analyzed yet.'
  }
})
chrome.storage.local.get(['bettingAnalysis'], function (result) {
  const tweetsDiv = document.getElementById('tweets')
  const bettingData = result.bettingAnalysis

  if (bettingData) {
    const analysisElement = document.createElement('div')
    analysisElement.textContent = `Betting Tweets: ${bettingData.count}, Sentiment Score: ${bettingData.sentimentScore}`
    tweetsDiv.appendChild(analysisElement)
  } else {
    tweetsDiv.textContent = 'No betting-related data found.'
  }
})
