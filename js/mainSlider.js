const durationFadeOut = 400;
const durationFadeIn = 1000;
$(".main-slide-arrow-next").on("click", function () {
  const jum = $(".jumbotron.active");
  if (jum) {
    $(".jumbotron.active .main-heading-content").eq(0).animate(
      {
        opacity: 0,
        fake: -120,
      },
      {
        duration: durationFadeOut,
        step: transitionAnimateX,
      }
    );

    $(".jumbotron.active .main-slide .img-fluid").eq(0).animate(
      {
        opacity: 0,
        fake: 100,
      },
      { duration: durationFadeOut, step: transitionAnimateY }
    );

    setTimeout(() => {
      jum.removeClass("active");
      const next = jum.next(".jumbotron");
      const target = next.length ? next : $(".jumbotron").first();
      target.addClass("active");
      target.find(".main-heading-content").eq(0).animate(
        { opacity: 1, fake: 0 },
        {
          duration: durationFadeIn,
          step: transitionAnimateX,
          // easing: easeOutCubic,
        }
      );
      target.find(".img-fluid").eq(0).animate(
        { opacity: 1, fake: 0 },
        {
          duration: durationFadeIn,
          step: transitionAnimateY,
          // easing: easeOutCubic,
        }
      );
    }, durationFadeOut);
  }
});

function transitionAnimateX(now, fx) {
  $(this).css("-webkit-transform", "translateX(" + now + "px)");
}
function transitionAnimateY(now, fx) {
  $(this).css("-webkit-transform", "translateY(" + now + "px)");
}
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}
