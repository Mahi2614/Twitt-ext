// Select all tweet elements on the page
const tweets = document.querySelectorAll('article')

// Array to hold the extracted tweet data
const tweetData = []

// Extract tweet text from each tweet
tweets.forEach((tweet) => {
  const tweetText = tweet.innerText
  tweetData.push(tweetText)
})

// Store the extracted tweets using Chrome's storage API
chrome.storage.local.set({ tweets: tweetData }, function () {
  console.log('Tweets have been stored in storage.')
})
