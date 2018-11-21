//on click event listener for topic buttons
$(document).on("click", ".city", function() {
  console.log("click");
  // grabbing the topic to call the api with from button clicked
  var topic = $(this).attr("data-name");
  //setting the url with topic added for api call
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topic +
    "&api_key=dc6zaTOxFJmzC&limit=10";
  //calling the api
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // console.log(response);
    //saving the response.data to variable
    var results = response.data;
    // iterating through the gifs passed back from api
    for (var i = 0; i < results.length; i++) {
      //making a new div element
      var cityDiv = $("<div>");
      //making a new p element to hold the rating
      var p = $("<p>");
      //attaching the rating to the p tag
      p.html(`Rating: ${results[i].rating}`);
      // console.log(results[i].rating);
      //make new img element to hold gif
      var cityImage = $("<img>");
      //setting the src to a fixed width gif that is paused
      cityImage.attr("src", results[i].images.fixed_width_still.url);
      //saving the paused url for pausing
      cityImage.attr("data-still", results[i].images.fixed_width_still.url);
      //saving the animated gif to start it playing

      cityImage.attr("data-animate", results[i].images.fixed_width.url);
      // setting state to paused
      cityImage.attr("data-state", "still");
      //adding image to div
      cityDiv.html(cityImage);
      //appending the p tag with the rating to the div

      cityDiv.append(p);
      //prepending all of that to the div set up on the dom
      $("#gifs-appear-here").prepend(cityDiv);
    }
  });
});
//setting up topic array to be made into buttons
var topics = ["Seattle", "Chicago", "New-York"];
//setting up function that will make all the topic buttons
function renderButtons() {
  //removing all the buttons to be remade
  $("#buttons-view").empty();
  //itterating through topic array to make buttons
  for (var i = 0; i < topics.length; i++) {
    //setting up new button element
    var btn = $("<button>");
    //adding classes to button
    btn.addClass("city col-1-md btn btn-success");
    // adding topic to buttonfor calling api with
    btn.attr("data-name", topics[i]);
    //adding text to button so user can know what topic they are calling
    btn.text(topics[i]);
    //adding button to div with id buttons-view  that resides on dom
    $("#buttons-view").append(btn);
  }
}
//adding event listener to grab user input for new topics to be added
$("#add-city").on("click", function(event) {
  // preventing for from submiting
  event.preventDefault();
  //setting user input to a var
  var city = $("#city-input")
    .val()
    .trim();
  //pushing user data to topic array
  topics.push(city);
  //calling render button function
  renderButtons();
});
//listening for click on gifs to pause or play gifs
$(document).on("click", "img", function() {
  //setting up a var state to hold a string
  var state = "";
  //grabbing the state of clicked gif and setting it to a var
  state = $(this).attr("data-state");

  // console.log(state);
  // a switch statement to check if paused or playing
  switch (state) {
    //if paused
    case "still":
      //set source to animated  gif
      $(this).attr("src", $(this).data("animate"));
      //setting gifs data-state to animate
      $(this).attr("data-state", "animate");

      break;
    //if gif is playing
    case "animate":
      // changes gif source to paused version
      $(this).attr("src", $(this).data("still"));
      // changes data-state to still
      $(this).attr("data-state", "still");
      break;
  }
});
// calls function renderButtons to make buttons at loading of page
renderButtons();
