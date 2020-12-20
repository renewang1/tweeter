$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('input', function() {
    const charLength = $(this).val().length;
    const $tweetForm = $(this).closest("form");
    const $counter = $tweetForm.find(".counter");
    $counter.html(140 - charLength);
    if (charLength > 140) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "black");
    }
  });
});

