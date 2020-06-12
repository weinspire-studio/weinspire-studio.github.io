// jshint esversion: 6
// import $ from "../../node_custom_modules/jquery/jquery.min.js";
let hasHoverListenerOnPortolio = false;
let isExpanded = false;

// jQuery for animated scroll
function smoothScroll() {
  $(".arrow-up").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      950
    );
  });
}

// adds hover effect on desktop
function animateImages() {
  $("#section-projects-design li").hover(
    function () {
      $(this).css("cursor", "pointer");
      $(this).addClass("expanded");
      $(this).siblings().addClass("contracted");
      $(this).children().eq(2).addClass("show-caption");
      isExpanded = true;
    },
    function () {
      $(this).removeClass("expanded");
      $(this).siblings().removeClass("contracted");
      $(this).children().eq(2).removeClass("show-caption");
      isExpanded = false;
    }
  );
  hasHoverListenerOnPortolio = true;
}

// unbinds listeners to desktop component (for mobile cube)
function unbindImages() {
  if (hasHoverListenerOnPortolio) {
    $("#section-projects-design li").off("mouseenter mouseleave");
    if (isExpanded) {
      $(".arrow-up").css("background-color, blue");
      $("#section-projects-design li").removeClass("expanded");
      $("#section-projects-design li").removeClass("contracted");
      $(".link-caption").removeClass("show-caption");
      isExpanded = false;
    }
  }
}

export { smoothScroll, animateImages, unbindImages };
