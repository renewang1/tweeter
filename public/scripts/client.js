/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //Mouseover/mouseout event handler to show/hide twitter 'buttons'
  $(document).on('mouseover', ".tweet-container", function() {
    $(this).find(".images").show();
  });
  $(document).on('mouseout', ".tweet-container", function() {
    $(this).find(".images").hide();
  });

  //On click toggle of tweet form and focus if form is showing
  $(document).on('click', "#compose-button", function() {
    $("#tweet-form").toggle("slow");
    $("#tweet-text").focus();
  });

  //On scroll function to show go to top button
  $(window).scroll(function() {
    $(".go-to-top-button").children().show();
  });

  //Functionality for go to top button, need setTimeout as without it, on scroll event happens and button is not hidden
  $(document).on('click', ".go-to-top-button", function() {
    $("#tweet-form").show();
    $(window).scrollTop(0);
    setTimeout(function() {
      $(".go-to-top-button").children().hide();
    }, 10);
  });

  //On submit event to intercept form submission, validate text in tweet-text, and send post request using AJAX, or error otherwise
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    const textBox = $("#tweet-text").val();
    const content = $("#tweet-form").serialize();
    if (textBox.length <= 0) {
      $("#error-message").html("Error tweet too short!");
      $("#error-message").show("slow");
    } else if (textBox.length > 140) {
      $("#error-message").html("Error tweet too long!");
      $("#error-message").show("slow");
    } else {
      $("#error-message").hide("slow");
      $.post("http://localhost:8080/tweets", content, function() {
        $("#tweet-text").val("");
        loadTweets();
      });
    }
  });

  const loadTweets = function() {
    $.ajax("http://localhost:8080/tweets", { method: 'GET' })
      .done(function(data) {
        renderTweets(data);
      });
  };

  loadTweets();
});

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const $tweet = $(`
    <article class="tweet-container">
      <header>
        <div>
          <img src=${escape(tweet.user.avatars)}>
          ${escape(tweet.user.name)}
        </div>
        <div class="sign">
          ${escape(tweet.user.handle)}
        </div>
      </header>
      <div>
        ${escape(tweet.content.text)}
      </div>
      <footer>
        ${escape(moment(tweet.created_at).toNow(true))} ago
        <div class="images">
          <img src="/images/flags.png">
          <img src="/images/retweet.png">
          <img src="/images/like.png">
        </div>
      </footer>
    </article>`);
  return $tweet;
};

//Function that emptys the tweets container and prepends tweet entries in database
const renderTweets = function(data) {
  $('.tweets-container').empty();
  for (let tweet of data) {
    let $tweet = createTweetElement(tweet);
    $('.tweets-container').prepend($tweet);
  }
};
