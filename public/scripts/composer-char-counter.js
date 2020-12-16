$(document).ready(function() {
  // --- our code goes here ---
  console.log('hello there')
  $('#tweet-text').on('input', function () {
    $(this).siblings().children('.counter').get(0).value = 140 - this.value.length;
  });
});

