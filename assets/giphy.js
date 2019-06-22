var gifArray = ["drums", "bass guitar", "electric guitar", "acoustic guitar", "keyboard", "saxaphone", "trumpet", "trombone", "piano", "clarinet", "violin"];

var apiKey = "zKMH2qHVvPI8CMQK2sktaHMc2VlRMptM";

$("#gifButtons").on("click", function () {
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=" + instrument + apiKey + "&limit=10";

    $.ajax({
    url: queryURL,
    method: "GET"
  })

    .then(function(response){
      console.log(queryURL);
      console.log(response);
    })
})

//NEED TO MAKE INSTRUMENT VARIABLE,
//Create dynamic buttons based on user search value
//