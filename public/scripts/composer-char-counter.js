$(document).ready(function() {
  // --- our code goes here ---
  console.log('hello there')
  $('#tweet-text').on('input', function () {
    let counterValue = $(this).siblings().children('.counter').get(0).value
    $(this).siblings().children('.counter').get(0).value = 140 - this.value.length;
    if (counterValue <= -1) {
      $(this).siblings().children('.counter').css("color", "yellow");
    } else if (counterValue >= 0) {
      $(this).siblings().children('.counter').css("color", "black");
    }
  });
});

