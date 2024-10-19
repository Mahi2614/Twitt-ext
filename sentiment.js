;(function () {
  // Initialize an object to hold the sentiment analysis logic
  var afinn = {
    abandon: -2,
    abandoned: -2,
    abandons: -2,
    absurd: -2,
    abuse: -3,
    abused: -3,
    abuses: -3,
    abusive: -3,
    accept: 1,
    accepted: 1,
    accepts: 1,
    accident: -2,
    accidental: -2,
    accidentally: -2,
    // ... add more words and their sentiment scores
  }

  // Sentiment function
  function Sentiment() {
    this.analyze = function (text) {
      var score = 0
      var words = text.split(/\W+/)
      var positiveWords = 0
      var negativeWords = 0

      for (var i = 0; i < words.length; i++) {
        var word = words[i].toLowerCase()
        if (afinn.hasOwnProperty(word)) {
          var value = afinn[word]
          score += value

          if (value > 0) {
            positiveWords++
          } else if (value < 0) {
            negativeWords++
          }
        }
      }

      return {
        score: score,
        comparative: score / words.length,
        positiveWords: positiveWords,
        negativeWords: negativeWords,
        words: words,
      }
    }
  }

  // Expose Sentiment globally
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Sentiment
  } else {
    self.Sentiment = Sentiment // Use 'self' instead of 'window'
  }
})()
