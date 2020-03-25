// jshint esversion: 6

let hasHoverListenerOnPortolio = false;

// jQuery for animated scroll.
function smoothScroll() {
  $("#up-arrow").on("click", function() {
    const siteWrapperTop = $("#site-wrapper").position().top;
    $("#site-wrapper").animate(
      {
        scrollTop: siteWrapperTop
      },
      750
    );
  });
}

function animateImages() {
  $("#section-projects-design li").hover(
    function() {
      $(this).addClass("expanded");
      $(this)
        .siblings()
        .addClass("contracted");
      $(this)
        .children()
        .eq(1)
        .addClass("show-caption");
    },
    function() {
      $(this).removeClass("expanded");
      $(this)
        .siblings()
        .removeClass("contracted");
      $(this)
        .children()
        .eq(1)
        .removeClass("show-caption");
    }
  );
  hasHoverListenerOnPortolio = true;
}

function unbindImages() {
  if (hasHoverListenerOnPortolio) {
    $("#section-projects-design li").unbind("mouseenter mouseleave");
  }
}

export { smoothScroll, animateImages, unbindImages };
