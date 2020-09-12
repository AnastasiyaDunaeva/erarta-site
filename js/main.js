//= "../node_modules/@glidejs/glide/dist/glide.min.js"
//= "../node_modules/jquery/dist/jquery.slim.js"
//= "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"

jQuery(document).ready(function ($) {
  [...document.querySelectorAll("a.menu__link")].forEach((el) => {
    const fxObj = LinkFx1;
    fxObj && new fxObj(el);
  });

  var carousel = new Glide(".glide", {
    autoplay: 5000,
    type: "slyder",
    perView: 5,
    gap: 0,
    focusAt: "center",
  });

  var tiltableElement = ".glide__container";

  carousel.mount({
    Coverflow: (GlideQ, Components, Events) => {
      var Plugin = {
        tilt(element) {
          var active = element.querySelector(tiltableElement);
          active.style.transform = "perspective(1500px) rotateY(0deg)";
          active.style.opacity = "1";
          active.style.filter = "saturate(1)";
          this.tiltPrevElements();
          this.tiltNextElements();
        },
        tiltPrevElements() {
          var activeSlide = Components.Html.slides[GlideQ.index];

          var previousElements = [];
          var getPrevious = (element) => {
            var e = element.previousElementSibling;
            if (e) {
              previousElements.push(e.querySelector(tiltableElement));
              getPrevious(e);
            }
          };
          getPrevious(activeSlide);

          previousElements.forEach((item, index) => {
            item.style.transformOrigin = "100% 50%";
            item.style.transform = `perspective(1500px) rotateY(${
              20 * Math.max(index, 2)
            }deg)`;
            item.style.opacity = `${Math.max(1 - (index + 1) * 0.2, 0)}`;
            item.style.filter = `saturate(${Math.max(
              1 - (index + 1) * 0.3,
              0
            )})`;
          });
        },
        tiltNextElements() {
          var activeSlide = Components.Html.slides[GlideQ.index];

          var nextElements = [];

          var getNext = (element) => {
            var e = element.nextElementSibling;
            if (e) {
              nextElements.push(e.querySelector(tiltableElement));
              getNext(e);
            }
          };
          getNext(activeSlide);

          nextElements.forEach((item, index) => {
            item.style.transformOrigin = "0% 50%";
            item.style.transform = `perspective(1500px) rotateY(${
              -20 * Math.max(index, 2)
            }deg)`;
            item.style.opacity = `${Math.max(1 - (index + 1) * 0.2, 0)}`;
            item.style.filter = `saturate(${Math.max(
              1 - (index + 1) * 0.3,
              0
            )})`;
          });
        },
      };

      Events.on(["mount.after", "run"], () => {
        Plugin.tilt(Components.Html.slides[GlideQ.index]);
      });

      return Plugin;
    },
  });
});
