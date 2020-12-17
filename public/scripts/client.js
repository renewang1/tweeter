/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $(".tweet-container").on('mouseover', function() {
    $('#sign').show();
  })

  $(".tweet-container").on('mouseout', function() {
    $('#sign').hide();
  })

  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    const content = $("#tweet-form").serialize();
    $("#tweet-text").empty();
    $.post("http://localhost:8080/tweets", content, function(response) {
      console.log('success')
    })
  })

  const loadTweets = function () {
    $.ajax("http://localhost:8080/tweets", { method: 'GET' })
    .done(function(data) {
      renderTweets(data)
    })
  }

  loadTweets();
})

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const createTweetElement = function (tweet) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div>
          ${tweet.user.avatars}
          ${tweet.user.name}
        </div>
        <div id="sign">
          ${tweet.user.handle}
        </div>
      </header>
      <div>
        ${tweet.content.text}
      </div>
      <footer>
        ${tweet.created_at}
      </footer>
    </article>`);
  return $tweet;
}

const renderTweets = function(data) {
  $('#tweets-container').empty();
  for (let tweet of data) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}
