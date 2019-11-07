$(document).ready(function() {

  var instruments = ["drums", "bass guitar", "electric guitar", "acoustic guitar", "keyboard", "harmonica", "trumpet", "trombone", "piano", "clarinet", "violin", "flute"];


  function displayPreloadedButtons() {
    $("#preloadedButtons").empty();

    for (var i=0; i <instruments.length; i++){
      var gifButton = $("<button>");
      gifButton.addClass("preload")
      gifButton.addClass("btn btn-success")
      gifButton.attr("data-name", instruments[i]);
      gifButton.text(instruments[i]);
      $("#preloadedButtons").append(gifButton);
    }
  }

  function addGifButton() {
    $("#addButton").on("click", function(){
      var userInstrument = $("#gifInput").val().trim();
      //prevents blank buttons from being added
      if (userInstrument == ""){
        return false;
      }
      instruments.push(userInstrument);

      displayPreloadedButtons();
      return false;
    })
  }

  function displayGifs(){
    var userInstrument = $(this).attr("data-name");
    var apiKey = "&api_key=zKMH2qHVvPI8CMQK2sktaHMc2VlRMptM&limit=10";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userInstrument + apiKey;
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      console.log(response);
      $("#gifDisplay").empty();

        var results = response.data;
        if (results == ""){
          alert("Sorry, no gifs available for such a weird inquiry");
        }
        for (var i = 0; i<results.length; i++){
          var gifDiv = $("<div>");
          gifDiv.addClass("card");//

          // gifDiv.attr("width: 18rem");
          var gifRating = $("<h5>").text("Rating: " + results[i].rating);
          gifRating.addClass("card-title");//
          gifDiv.append(gifRating);

          var gifImage = $("<img>");
          gifImage.addClass("card-img-top");//
          // gifImage.attr("width: 18rem");
          gifImage.attr("src", results[i].images.fixed_height_small_still.url);
          
          gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);

          gifImage.attr("data-animate", results[i].images.fixed_height_small.url);

          gifImage.attr("data-state", "still");
          gifImage.addClass("image");
          gifDiv.prepend(gifImage);

          $("#gifDisplay").prepend(gifDiv);
        }
    });
  }
  displayPreloadedButtons();
  addGifButton();

  $(document).on("click", ".preload", displayGifs);
  $(document).on("click", ".image", function(){
    var state = $(this).attr("data-state");
    if (state == "still"){
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate");
    } else{
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    }
  }) 
})