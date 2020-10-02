//isotope

let $grid = $(".grid").isotope({
  itemSelector: ".grid-item",
  percentPosition: true,
  masonry: {
    columnWidth: ".grid-item",
  },
});
// filter items on button click
$(".filter-button-group").on("click", "button", function () {
  $(".filter-button-group button.active").removeClass("active");
  $(this).addClass("active");
  let filterValue = $(this).attr("data-filter");
  $grid.isotope({
    filter: filterValue,
  });
});
