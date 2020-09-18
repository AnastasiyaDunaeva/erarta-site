//= "../node_modules/@glidejs/glide/dist/glide.min.js"
//= "../node_modules/jquery/dist/jquery.slim.js"

jQuery(document).ready(function ($) {
  var carouselExhibitions = new Glide(".glide-exhibitions", {
    autoplay: 5000,
    type: "slyder",
    perView: 5,
    gap: 0,
    focusAt: "center",
  });

  var carouselNews = new Glide(".glide-news", {
    autoplay: 5000,
    type: "carousel",
    perView: 5,
    gap: 0,
    focusAt: "center",
  });

  carouselNews.mount();

  var tiltableElement = ".glide__container";

  carouselExhibitions.mount({
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