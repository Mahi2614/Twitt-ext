// background.js
importScripts('sentiment.js') // Make sure sentiment.js is in the same directory

// Initialize the Sentiment analyzer
const sentiment = new Sentiment()

// Keywords to identify betting-related tweets
const bettingKeywords = ['#betting', 'odds', 'stake', 'bet']

// Analyze betting-related trends in tweets
const analyzeBettingTrends = (tweets) => {
  const bettingTweets = tweets.filter((tweet) =>
    bettingKeywords.some((keyword) => tweet.toLowerCase().includes(keyword))
  )

  const sentimentScore = bettingTweets.reduce((acc, tweet) => {
    const sentimentResult = sentiment.analyze(tweet)
    return acc + sentimentResult.score
  }, 0)

  return {
    count: bettingTweets.length,
    sentimentScore,
  }
}

// Fetch and analyze tweets from storage
chrome.storage.local.get(['tweets'], function (result) {
  if (result.tweets) {
    // Perform sentiment analysis on tweets
    const analyzedTweets = result.tweets.map((tweet) => ({
      tweet,
      sentiment: sentiment.analyze(tweet),
    }))

    // Store the analyzed sentiment results
    chrome.storage.local.set({ analyzedTweets: analyzedTweets }, function () {
      console.log('Sentiment analysis of tweets complete.')
    })

    // Perform betting trend analysis
    const bettingAnalysis = analyzeBettingTrends(result.tweets)

    // Store the betting trend analysis results
    chrome.storage.local.set({ bettingAnalysis: bettingAnalysis }, function () {
      console.log('Betting analysis complete.')
    })
  } else {
    console.log('No tweets found in storage.')
  }
})

// Listener to analyze individual tweets sent by the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeTweet') {
    const result = sentiment.analyze(request.text)
    sendResponse(result)
  }
})
