$(document).on("click", ".city", function() {
  console.log("click");
  var topic = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topic +
    "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var cityDiv = $("<div>");

      var p = $("<p>");

      p.html(`Rating: ${results[i].rating}`);
      console.log(results[i].rating);
      var cityImage = $("<img>");

      cityDiv.addClass("col-4-md");

      cityImage.attr("src", results[i].images.fixed_width_still.url);

      cityImage.attr("data-still", results[i].images.fixed_width_still.url);

      cityImage.attr("data-animate", results[i].images.fixed_width.url);

      cityImage.attr("data-state", "still");

      cityDiv.html(cityImage);

      cityDiv.append(p);

      $("#gifs-appear-here").prepend(cityDiv);
    }
  });
});
var cities = ["Seattle", "Chicago", "New-York"];
function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < cities.length; i++) {
    var a = $("<button>");

    a.addClass("city col-1-md btn btn-success");

    a.attr("data-name", cities[i]);

    a.text(cities[i]);

    $("#buttons-view").append(a);
  }
}
$("#add-city").on("click", function(event) {
  event.preventDefault();

  var city = $("#city-input")
    .val()
    .trim();

  cities.push(city);

  renderButtons();
});
$(document).on("click", "img", function() {
  var state = "";
  state = $(this).data("state");

  console.log(state);

  switch (state) {
    case "still":
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate");
      console.log($(this).data("state"));
      console.log($(this).attr("data-state"));
      console.log($(this));
      break;
    case "animate":
      console.log(state);
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
      break;
  }
});
renderButtons();
