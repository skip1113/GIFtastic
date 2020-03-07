//Array of shows for gifs
var memes = ["trending", "the simpsons", "spongebob", "king of the hill", "south park", "bobs burger", "family guy", "tom and jerry"];
//API test
var memes = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=simpsons&api_key=LS1HNxaxg8yQf68z10qhwgr4cY9m12FU";
    
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + memes + "&api_key=LS1HNxaxg8yQf68z10qhwgr4cY9m12FU";
        
    //ajax call for giphy url
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(results) {
        console.log(results.data);
    })
//gif ,rating display
function displayGif() {

    var memes = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + memes + "&api_key=LS1HNxaxg8yQf68z10qhwgr4cY9m12FU";
        
    //ajax call for giphy url
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            //take action if gif is not rated r
            if (results[i].rating !== "r") {
                //create gif div
                var gifDiv = $("<div>");
                //store gif ratings
                var rating = results.rating;
                //creating p tag with rating and rating results
                var p = $("<p>").text("Rating: " + rating);
                //creating image tag
                var gifImage = $("<img>");
                //give gifimage src attribute for image
                gifImage.attr("src", results[i].image.fixed_height.url);
                //append image and rating to new div created
                gifDiv.append(gifImage);
                gifDiv.append(p);
                //prepend image and rating to html
                $("#gifs-here").prepend(gifDiv);
            }
        }
    })

}