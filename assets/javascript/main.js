$(document).on("click", ".city", function() {
  console.log("click");
  var city = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    city +
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

      // data-still="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif"
      // data-animate="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200.gif"
      // data-state="still"

      cityImage.attr("src", results[i].images.fixed_width.url);

      cityImage.addClass("col-4-md");

      cityDiv.html(cityImage);

      cityDiv.prepend(p);

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
  // This line of code will grab the input from the textbox
  var city = $("#city-input")
    .val()
    .trim();

  // The city from the textbox is then added to our array
  cities.push(city);

  // Calling renderButtons which handles the processing of our city array
  renderButtons();
});
renderButtons();
