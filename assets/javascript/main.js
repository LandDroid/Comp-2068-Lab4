document.addEventListener("DOMContentLoaded", () => {
  $(".summernote").summernote({
    placeholder: "Let the words tumble...",
    tabsize: 2,
    height: 300,
  });
});

$("#myList a").on("click", function (e) {
  e.preventDefault();
  $(this).tab("show");
});
